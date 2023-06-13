import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { UserEntity } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatService } from './chat.service';
import { AuthService } from 'src/auth/auth.service';
import { ChatController } from './chat.controller';
import { RoomEntity } from 'src/entities/room.entity';
import { MessageEntity } from 'src/entities/message.entity';
import { ConnectionEntity } from 'src/entities/connection.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      RoomEntity,
      MessageEntity,
      ConnectionEntity,
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, AuthService],
})
export class ChatModule {}
