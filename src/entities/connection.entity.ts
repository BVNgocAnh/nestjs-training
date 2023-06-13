import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoomEntity } from './room.entity';
import { UserEntity } from './user.entity';

@Entity('connection')
export class ConnectionEntity {
  @PrimaryGeneratedColumn()
  conversation_id: number;

  @Column()
  socket_id: string;

  @ManyToOne(() => RoomEntity, (room) => room.room_id)
  @JoinColumn({ name: 'room_id' })
  room_id: RoomEntity;

  @ManyToOne(() => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
