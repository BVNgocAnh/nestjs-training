import { OnModuleInit, Logger, Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { ChatService } from './chat.service';
import { WsAuthGuard } from './ws.guard';
import { UserEntity } from 'src/entities/user.entity';
import { RoomStatus } from 'src/enum/enum';
import { MessageDto, RoomDto } from './dtos/chat.dto';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class ChatGateway
  implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized ChatGateway');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id} `);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    const user_token = client.handshake.headers.authorization;
  }

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('=================================================');
      console.log('server_socketID: ', socket.id);
      console.log('Server connected to gateway');
      console.log('=================================================');
    });
  }

  @SubscribeMessage('createRoom')
  async handleCreateRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() createRoom: RoomDto,
  ) {
    const user_token = client.handshake.headers.authorization;
    console.log(user_token);
    const exist_room = await this.chatService.createRoom(
      user_token,
      createRoom,
    );

    if (exist_room === RoomStatus.ROOM_CREATED) {
      client.join(createRoom.room_name?.toString());

      const start_chat = await this.chatService.handleJoinRoom(
        user_token,
        createRoom,
      );

      if (start_chat === RoomStatus.START_CHAT) {
        this.server
          .to(createRoom.room_name?.toString())
          .emit('joinedRoom', { message: 'success' });
      } else {
        this.server.emit('joinRoomFailed', {
          message: 'Faild to join Room',
        });
      }
      this.server.emit('createdRoom', { message: 'create successfully' });
    } else {
      this.server.emit('createdRoomError', {
        message: 'failed to create room',
      });
    }
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() joinRoom: RoomDto,
  ) {
    const user_token = client.handshake.headers.authorization;

    if (user_token) {
      client.join(joinRoom.room_id?.toString());
    }

    const start_chat = await this.chatService.handleJoinRoom(
      user_token,
      joinRoom,
    );

    if (start_chat === RoomStatus.START_CHAT) {
      this.server
        .to(joinRoom.room_id?.toString())
        .emit('joinedRoom', { message: 'success' });
    } else {
      this.server.emit('joinRoomFailed', {
        message: 'Faild to join Room',
      });
    }
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() leaveRoom: RoomDto,
  ) {
    const user_token = client.handshake.headers.authorization;

    if (user_token) {
      client.leave(leaveRoom.room_name?.toString());
    }

    const response = await this.chatService.handleLeaveRoom(
      user_token,
      leaveRoom,
    );
    const leave_room_id = leaveRoom.room_id.toString();

    if (response === RoomStatus.USER_ROOM_EXISTED) {
      client.leave(leave_room_id);
      console.log(leave_room_id);
      console.log(response);
      this.server.emit('leftRoom', {
        message: 'User  was outed this group',
      });
    } else {
      this.server.emit('leavedRoomFailed', {
        message: 'Fail to out!',
      });
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() sendMessage: MessageDto,
  ) {
    const user_token = client.handshake.headers.authorization;

    const start_chat = await this.chatService.handleSendMessage(
      user_token,
      sendMessage,
    );

    const send_message_id = sendMessage.room_id.toString();
    if (client.rooms.has(send_message_id)) {
      if (start_chat === RoomStatus.START_CHAT) {
        this.server.to(sendMessage.room_id?.toString()).emit('onMessage', {
          socketId: client.id,
          msg: 'NEW MESSAGE',
          content: sendMessage.content,
        });
      } else {
        this.server.emit('onMessageFailed', {
          message: 'send message failed',
        });
      }
    } else {
      this.server.emit('onMessageFailed', {
        message: 'send message failed',
      });
    }
  }
}
