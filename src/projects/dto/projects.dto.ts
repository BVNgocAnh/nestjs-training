import { IsString } from 'class-validator';

export class ProjectsDto {
  @IsString()
  name_project: string;
  description: string;
}
