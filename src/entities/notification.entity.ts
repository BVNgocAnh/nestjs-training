import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
@Entity('notification')
export class NotificationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  noti_id: number;

  @Column({ nullable: true })
  message: string;

  @Column({
    type: Number,
    array: true,
    nullable: true,
  })
  user_ids: number[];

  @ManyToOne(() => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'created_by' })
  created_by?: UserEntity;
}
