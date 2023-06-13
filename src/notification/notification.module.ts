import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';

import { AuthService } from 'src/auth/auth.service';
import { NotificationEntity } from 'src/entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, NotificationEntity])],
  controllers: [NotificationController],
  providers: [NotificationService, AuthService],
})
export class NotificationModule {}
