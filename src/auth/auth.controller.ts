import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  UseGuards,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { UserEntity } from 'src/entities/user.entity';
import { Roles } from 'src/guard/roles.decorator';
import { Role } from 'src/enum/enum';
import { AuthGuard } from 'src/guard/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @UsePipes(ValidationPipe)
  async signUp(
    @Body()
    authCredentialsDto: AuthDto,
  ): Promise<UserEntity> {
    return this.authService.signUp(authCredentialsDto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(
    @Body()
    authCredentialsDto: AuthDto,
  ) {
    return this.authService.signIn(authCredentialsDto);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @Get('user/:id')
  async getUserById(@Param('id') id: number): Promise<UserEntity | undefined> {
    return await this.authService.getUserById(id);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @Get('get-users')
  async getAllUsers(): Promise<UserEntity[]> {
    return this.authService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @Post('create-new-user')
  async createNewUser(
    @Body() authCredentialsDto: AuthDto,
  ): Promise<UserEntity> {
    return this.authService.createNewUser(authCredentialsDto);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @Put('update-user-by-id/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() authCredentialsDto: AuthDto,
  ) {
    return this.authService.updateUserById(id, authCredentialsDto);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @Delete('delete-user-by-id/:id')
  async deleteUserById(@Param('id') id: number) {
    return this.authService.deleteUserById(id);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @Get('get-user-birthday-in-month')
  async getUsersWithBirthdayInCurrentMonth(): Promise<UserEntity[] | any> {
    return this.authService.getUsersWithBirthdayInCurrentMonth();
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @Get('get-user-birthday-today')
  async getUserBirthdayInToday() {
    return this.authService.getUserBirthdayInToday();
  }
}
