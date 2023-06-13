import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from 'src/entities/user.entity';
import { In, Repository } from 'typeorm';
import { MessageDto, RoomDto } from './dtos/chat.dto';
import { RoomStatus } from 'src/enum/enum';
import { RoomEntity } from 'src/entities/room.entity';
import { MessageEntity } from 'src/entities/message.entity';
import { ConnectionEntity } from 'src/entities/connection.entity';
import { ExceptionResponse } from 'src/response/response.exception';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
    @InjectRepository(ConnectionEntity)
    private connectionRepository: Repository<ConnectionEntity>,
  ) {}

  async handleConnection(user_token: string, client: any) {
    const user = await this.userRepository.findOne({
      where: {
        access_token: user_token,
      },
    });
    console.log(user_token, 123);
    if (!user) return RoomStatus.USER_NOT_EXIST;

    const connection = await this.connectionRepository.create({
      socket_id: client.socket_ID,
      user: { user_id: user.user_id },
      room_id: { room_id: 0 },
    });
    await this.connectionRepository.save(connection);
  }

  // async handleDisconection(connection_id: number,socket_ID: string){
  //   try {
  //     const connection = this.connectionRepository.findOne({
  //       where: {
  //         conversation_id: connection_id
  //     }})
  //     if(!connection) throw new NotFoundException()

  //   } catch (e) {
  //     throw e
  //   }

  // }
  async createRoom(user_token: string, createRoom: RoomDto) {
    console.log(123);
    const user = await this.userRepository.findOne({
      where: {
        access_token: user_token,
      },
    });
    if (!user) return RoomStatus.USER_NOT_EXIST;
    console.log(1);
    const room = await this.roomRepository.findOne({
      where: {
        room_id: createRoom.room_id,
      },
    });

    if (!room) return RoomStatus.ROOM_NOT_EXIST;
    console.log(room);
    const user_member = [];
    user_member.push(user.user_id);
    const room_create = this.roomRepository.create({
      name_room: createRoom.room_name,
      user_ids_room: user_member,
    });
    await this.roomRepository.save(room_create);
    return RoomStatus.ROOM_CREATED;
  }

  async handleJoinRoom(user_token: string, joinRoom: RoomDto) {
    const room = await this.roomRepository.findOne({
      where: { room_id: joinRoom.room_id },
    });
    if (!room) {
      return RoomStatus.ROOM_NOT_EXIST;
    }

    const user = await this.userRepository.findOne({
      where: {
        access_token: user_token,
      },
    });

    if (!user) return RoomStatus.USER_NOT_EXIST;

    const user_in_room = room.user_ids_room.find((item) => {
      return item == user.user_id;
    });

    if (user_in_room == undefined) {
      const message_create = this.messageRepository.create({
        content: 'Welcome to this group!',
        send_by: { user_id: user.user_id },
        room_id: { room_id: room.room_id },
      });

      await this.messageRepository.save(message_create);
      const user_member = room.user_ids_room;
      user_member.push(user.user_id);
      await this.roomRepository.update(
        { room_id: room.room_id },
        {
          user_ids_room: user_member,
        },
      );
    }

    return RoomStatus.START_CHAT;
  }

  async handleLeaveRoom(user_token: string, leaveRoom: RoomDto) {
    const room = await this.roomRepository.findOne({
      where: { room_id: leaveRoom.room_id },
    });
    if (!room) {
      return RoomStatus.ROOM_NOT_EXIST;
    }

    const user = await this.userRepository.findOne({
      where: {
        access_token: user_token,
      },
    });
    if (!user) return RoomStatus.USER_NOT_EXIST;

    const userIndex = room.user_ids_room.indexOf(user.user_id);
    if (userIndex === -1) {
      return RoomStatus.USER_ROOM_EXISTED;
    }

    room.user_ids_room.splice(userIndex, 1);
    await this.roomRepository.save(room);

    return RoomStatus.USER_OUT_ROOM;
  }

  async handleSendMessage(user_token: string, sendMessage: MessageDto) {
    const user = await this.userRepository.findOne({
      where: {
        access_token: user_token,
      },
    });
    if (!user) return RoomStatus.USER_NOT_EXIST;

    const room = await this.roomRepository.findOne({
      where: { room_id: sendMessage.room_id },
    });
    if (!room) {
      return RoomStatus.ROOM_NOT_EXIST;
    }

    const user_in_room = room.user_ids_room.find((item) => {
      return item == user.user_id;
    });

    if (user_in_room) {
      const message_creating = this.messageRepository.create({
        content: sendMessage.content,
        send_by: { user_id: user.user_id },
        room_id: { room_id: room.room_id },
      });
      await this.messageRepository.save(message_creating);
      return RoomStatus.USER_ROOM_EXISTED;
    }
    if (!user_in_room) return RoomStatus.USER_NOT_EXIST;

    return RoomStatus.START_CHAT;
  }
}
