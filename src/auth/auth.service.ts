import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, getRepository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { AuthDto } from './dto';
import {
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
import * as jwt from 'jwt-simple';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async validateToken(payload: any): Promise<boolean> {
    try {
      const isValid = true;
      return isValid;
    } catch (error) {
      return false;
    }
  }
  async signUp(authCredentialsDto: AuthDto) {
    try {
      const { username: username, password: password } = authCredentialsDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create(authCredentialsDto);
      user.username = username;
      user.password = hashedPassword;
      await this.userRepository.save(user);
      return user;
    } catch (e) {
      {
        console.log(e);
        throw new InternalServerErrorException('Something went worng');
      }
    }
  }

  async signIn(authCredentialsDto: AuthDto): Promise<{ access_token: string }> {
    try {
      const { username: username, password: password } = authCredentialsDto;

      const user = await this.userRepository.findOne({ username });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const isPasswordValid: boolean = await bcrypt.compare(
        password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload = {
        username: user.username,
        sub: user.user_id,
        permission: user.permission,
      };

      const access_token = await this.jwtService.sign(payload);
      user.access_token = access_token;
      await this.userRepository.save(user);

      return { access_token };
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }

  async createNewUser(authCredentialsDto: AuthDto): Promise<UserEntity> {
    try {
      const { username, password } = authCredentialsDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create(authCredentialsDto);
      user.username = username;
      user.password = hashedPassword;
      await this.userRepository.save(user);
      return user;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getAllUsers(): Promise<UserEntity[]> {
    const user = this.userRepository.find({ where: { permission: 'user' } });
    return user;
  }

  async getUserById(user_id: number): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          user_id: user_id,
        },
        relations: [
          'user_have_project',
          'user_have_project.projects',
          'user_bought_product',
          'user_bought_product.products',
          'user_react',
          'user_react.post',
          'user_comment',
          'user_comment.post',
          `user_message`,
          `user_message.room`,
        ],
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${user_id} not found`);
      }
      return user;
    } catch (e) {
      throw e;
    }
  }

  async updateUserById(
    user_id: number,
    authCredentialsDto: AuthDto,
  ): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { user_id } });
      if (!user) {
        throw new NotFoundException(
          `Can update user with ID ${user_id} cause not found in system`,
        );
      }
      return this.userRepository.update(user_id, authCredentialsDto);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async deleteUserById(user_id: number): Promise<UserEntity | any> {
    try {
      const user = await this.userRepository.findOne({ where: { user_id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${user_id} not found`);
      } else return this.userRepository.delete(user_id);
    } catch (e) {
      throw e;
    }
  }

  async compareToken(token1: string, token2: string): Promise<Boolean> {
    return token1 === token2;
  }

  async getUsersWithBirthdayInCurrentMonth(): Promise<UserEntity[] | any> {
    try {
      const date = new Date();
      const currentMonth = date.toISOString().split('T')[0];
      const birthday_month = currentMonth.split('-')[1];
      const users_month = await getRepository(UserEntity)
        .createQueryBuilder('user')
        .where(`user.birthday like :birthday`, {
          birthday: `%-${birthday_month}-%`,
        })
        .getMany();
      return users_month;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('Failed to get users by birthday');
    }
  }

  async getUserBirthdayInToday() {
    try {
      const today = new Date();
      const toString = today.toISOString().split('T')[0];
      const birthday_string =
        toString.split('-')[1] + `-` + toString.split('-')[2];
      const users_birthday = await getRepository(UserEntity)
        .createQueryBuilder('user')
        .where(`user.birthday like :birthday`, {
          birthday: `%${birthday_string}%`,
        })
        .getMany();
      return users_birthday;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
