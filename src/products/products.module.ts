import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UserEntity } from 'src/entities/user.entity';
import { ProductEntity } from 'src/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProductEntity } from 'src/entities/user_product.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { CategoryProductEntity } from 'src/entities/category_product';
import { CategoryEntity } from 'src/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ProductEntity,
      UserProductEntity,
      CategoryProductEntity,
      CategoryEntity,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, AuthService, JwtService],
})
export class ProductsModule {}
