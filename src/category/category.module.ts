import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { CategoryProductEntity } from 'src/entities/category_product';
import { CategoryEntity } from 'src/entities/category.entity';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      CategoryProductEntity,
      CategoryEntity,
      UserEntity,
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, AuthService],
})
export class CategoryModule {}
