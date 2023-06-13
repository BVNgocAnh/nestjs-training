import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/guard/roles.decorator';
import { Role } from 'src/enum/enum';
import { AuthGuard } from 'src/guard/roles.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.USER)
  @Post('create-product')
  async createProduct(
    @Req() req: any,
    @Body() createProductDto: CreateProductDto,
  ) {
    return await this.productsService.create(req.user_id, createProductDto);
  }

  @Get('get-products')
  async getProducgts() {
    return await this.productsService.getAllProducts();
  }

  @Get('get-product/:product_id')
  findOne(@Param('product_id') product_id: number) {
    return this.productsService.getProductById(product_id);
  }

  @Put('update-product/:id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Put('delete-product/:id')
  async deleteProduct(
    @Param('id') id: number,
    @Body() @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProductStatus(id, updateProductDto);
  }
}
