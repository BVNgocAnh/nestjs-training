import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MessageEntity } from './message.entity';
import { UserEntity } from './user.entity';
import { ConnectionEntity } from './connection.entity';
import { connect } from 'http2';

@Entity('rooms')
export class RoomEntity {
  @PrimaryGeneratedColumn()
  room_id: number;

  @Column()
  name_room: string;

  @Column({
    type: Number,
    array: true,
    nullable: true,
  })
  user_ids_room: number[];

  @OneToMany(() => MessageEntity, (message) => message.room_id)
  messages: MessageEntity[];

  @OneToMany(() => ConnectionEntity, (connection) => connection.room_id)
  @JoinColumn({ name: 'in_room' })
  in_room: ConnectionEntity[];
}
