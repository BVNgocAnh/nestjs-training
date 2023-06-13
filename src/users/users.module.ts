import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ProjectEntity } from 'src/entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { ProductEntity } from 'src/entities/product.entity';
import { UserProductEntity } from 'src/entities/user_product.entity';
import { AuthService } from 'src/auth/auth.service';
import { NotificationEntity } from 'src/entities/notification.entity';
import { NotificationService } from 'src/notification/notification.service';
import { PostEntity } from 'src/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectEntity,
      UserEntity,
      ProductEntity,
      UserProductEntity,
      NotificationEntity,
      PostEntity,
    ]),
  ],
  providers: [UsersService, AuthService],
  controllers: [UsersController],
})
export class UsersModule {}
