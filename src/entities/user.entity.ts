import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from 'src/enum/enum';
import { UserProjectEntity } from './user_project.entity';
import { UserProductEntity } from './user_product.entity';
import { ReactionPostEntity } from './reaction.entity';
import { CommentEntity } from './comment.entity';
import { MessageEntity } from './message.entity';
import { ConnectionEntity } from './connection.entity';

@Entity('user') //name table
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn() //primaryKey
  user_id: number;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  permission: Role;

  @Column({ nullable: true })
  access_token: string;

  @Column({ nullable: true, type: 'varchar' })
  birthday: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => UserProjectEntity, (project) => project.users)
  user_have_project?: UserProjectEntity[];

  @OneToMany(() => UserProductEntity, (product) => product.users)
  user_bought_product?: UserProductEntity[];

  @OneToMany(() => ReactionPostEntity, (post) => post.user)
  @JoinColumn({ name: 'user_react' })
  user_react?: ReactionPostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  @JoinColumn({ name: 'userId_comment' })
  user_comment?: CommentEntity[];

  @OneToMany(() => MessageEntity, (message) => message.send_by)
  user_send_message?: MessageEntity[];

  @OneToMany(() => ConnectionEntity, (connection) => connection.user)
  user_connection?: ConnectionEntity[];
}
