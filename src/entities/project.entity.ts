import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserProjectEntity } from './user_project.entity';

@Entity('project')
export class ProjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  project_id: number;

  @Column({ nullable: true })
  name_project: string;

  @Column({ nullable: true })
  project_status: number;

  @OneToMany(() => UserProjectEntity, (user) => user.projects)
  project_have_user?: UserProjectEntity[];
}
