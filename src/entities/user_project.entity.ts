import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { ProjectEntity } from './project.entity';

@Entity('user_project')
export class UserProjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'user_project_id' })
  user_project_id: number;

  @ManyToOne(() => UserEntity, (user) => user.user_id)
  users: UserEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.project_id)
  projects: ProjectEntity;
}
