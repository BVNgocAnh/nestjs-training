import { IsString } from 'class-validator';

export class CreateCategoryDto {
  user_id: number;
  category_id: number;

  @IsString()
  name_category: string;
}
