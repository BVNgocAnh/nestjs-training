import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { AuthGuard } from 'src/guard/roles.guard';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(AuthGuard)
  @Post('create-noti')
  create(@Req() req: any, @Body() body: any) {
    return this.notificationService.createNotification(req.user_id, body);
  }

  @UseGuards(AuthGuard)
  @Get('check-user-get-noti')
  async checkUserGetNoti(@Req() req: any, @Body() body: any) {
    return await this.notificationService.checkUserGetNoti(req.user_id, body);
  }
}
