// import {
//   BaseEntity,
//   Column,
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   PrimaryGeneratedColumn,
// } from 'typeorm';
// import { UserEntity } from 'src/entities/user.entity';
// import { NotificationEntity } from './notification.entity';

// @Entity('user_notification')
// export class UserNotiEntity extends BaseEntity {
//   @PrimaryGeneratedColumn({ name: 'user_noti_id' })
//   user_noti_id: number;

//   // @ManyToOne(() => UserEntity, (user) => user.user_id)
//   // @JoinColumn({ name: 'user_id' })
//   // users: UserEntity;

//   @ManyToOne(() => NotificationEntity, (notification) => notification.noti_id)
//   @JoinColumn({ name: 'noti_id' })
//   notifications: NotificationEntity;

//   @Column({
//     type: Number,
//     array: true,
//   })
//   user_ids: number[];
// }
