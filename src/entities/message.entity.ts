import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoomEntity } from './room.entity';
import { UserEntity } from './user.entity';
@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(() => RoomEntity, (room) => room.room_id)
  room_id: RoomEntity;

  @ManyToOne(() => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'send_by' })
  send_by?: UserEntity;
}
