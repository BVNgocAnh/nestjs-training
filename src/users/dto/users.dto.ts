import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserEntity } from 'src/entities/user.entity';
export class UserDto {
  @IsString()
  firstname: string;
  lastname: string;
  address: string;

  @IsNotEmpty()
  project_id: number;
}
