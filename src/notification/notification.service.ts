import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationEntity } from 'src/entities/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, getRepository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { take } from 'rxjs';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notiRepository: Repository<NotificationEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getUserByID(user_id: number) {
    try {
      const user = this.userRepository.findOne({
        where: { user_id },
      });
      return user;
    } catch (e) {
      throw e;
    }
  }

  async createNotification(user_id: number, body: any) {
    try {
      const user = await this.getUserByID(user_id);
      const users = await this.userRepository.find({
        where: {
          user_id: In(body.users),
        },
      });
      console.log(users);

      if (users.length == 0) {
        return new NotFoundException(`User have ${user_id} not found`);
      }
      const listUserId: number[] = users.map((user) => user.user_id);
      console.log(listUserId);
      const create_new_noti = await this.notiRepository
        .create({
          message: body.message,
          created_by: user,
          user_ids: listUserId,
        })
        .save();

      return create_new_noti;
    } catch (e) {
      throw e;
    }
  }

  findAll() {
    return `This action returns all notification`;
  }

  async checkUserGetNoti(user_id: number, body: any) {
    try {
      const user = await this.getUserByID(user_id);
      if (!user) {
        return new NotFoundException(`User have ${user_id} not found`);
      }

      const limitNoti = body.limitNoti || 20;
      const page = body.page || 1;
      const skip = limitNoti * (page - 1);

      const [notifications, totalCount] = await this.notiRepository
        .createQueryBuilder('notification')
        .where(`:userId = ANY (notification.user_ids)`, { userId: user_id })
        .orWhere(`notification.user_ids IS NULL`)
        .orderBy(`notification.noti_id`, 'ASC')
        .take(limitNoti)
        .skip(skip)
        .getManyAndCount();

      const totalPages = Math.ceil(totalCount / limitNoti);

      return { notifications, totalCount, currentPage: page, totalPages };
    } catch (e) {
      throw e;
    }
  }

  async findOne(noti_id: number) {
    try {
      const noti = await this.notiRepository.findOne({
        where: { noti_id },
      });
      return noti;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
