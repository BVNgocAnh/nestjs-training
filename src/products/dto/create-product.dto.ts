import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  product_id: number;

  @IsString()
  name_product: string;
  description: string;
  name_product_clone: string;

  @IsNumber()
  quantity: number;
  status: number;
  inStock: number;
}
