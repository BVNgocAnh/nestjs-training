import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  name_product: string;
  name_product_clone: string;
  description: string;

  @IsNumber()
  status: number;
  inStock: number;
  quantity: number;
}
