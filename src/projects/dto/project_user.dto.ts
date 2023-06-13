import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from 'src/entities/user.entity';
export class ProjectsUserDto {
  project_id: number;
  user_id: number;
}
