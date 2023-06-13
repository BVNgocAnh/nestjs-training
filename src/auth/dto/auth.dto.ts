import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/enum/enum';
export class AuthDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  address: string;

  @IsNotEmpty()
  permission: Role;
  birthday: string;
  created_at: Date;
}
