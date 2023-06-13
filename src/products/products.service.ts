import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { ExceptionResponse } from '../response/response.exception';
import { ProductResponse } from './response/product.response';
import { UserProductEntity } from 'src/entities/user_product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(UserProductEntity)
    private userproductRepository: Repository<UserProductEntity>,

    private authService: AuthService,
  ) {}

  async create(user_id: number, createProductDto: CreateProductDto) {
    try {
      const user = await this.authService.getUserById(user_id);
      if (!user) {
        return new NotFoundException(`User have ${user_id} not found`);
      }

      const product_name = createProductDto.name_product
        .toLowerCase()
        .trim()
        .replace(/\s/g, '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      const productExist = await this.productRepository.findOne({
        where: {
          name_product_clone: product_name,
        },
      });

      if (productExist)
        throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'Product is exist');

      const new_product = this.productRepository
        .create({
          name_product: createProductDto.name_product,
          name_product_clone: product_name,
          description: createProductDto.description,
          quantity: createProductDto.quantity,
          status: createProductDto.status,
          inStock: createProductDto.inStock,
          created_by: user,
        })
        .save();
      return new_product;
    } catch (e) {
      throw e;
    }
  }

  async getAllProducts() {
    try {
      return await this.productRepository.find();
    } catch (e) {
      throw e;
    }
  }

  async getProductById(product_id: number) {
    try {
      const product = await this.productRepository.findOne({
        where: { product_id },
        relations: ['products_bought_user', 'products_bought_user.users'],
      });
      if (!product) {
        throw new NotFoundException(`Product with ID ${product_id} not found`);
      }

      return ProductResponse.MaptoList(product);
    } catch (e) {
      throw new ExceptionResponse(HttpStatus.NOT_FOUND, 'Not found');
    }
  }

  async updateProduct(product_id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.getProductById(product_id);
      if (!product) {
        return new NotFoundException(`Product ${product_id} not found`);
      }
      const product_name = updateProductDto.name_product
        .toLowerCase()
        .trim()
        .replace(/\s/g, '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      const product_name_exist = await this.productRepository.findOne({
        where: {
          name_product_clone: product_name,
        },
      });

      if (product_name == product.name_product_clone) {
        return await this.productRepository.update(product_id, {
          name_product: updateProductDto.name_product,
          description: updateProductDto.description,
          quantity: updateProductDto.quantity,
          inStock: updateProductDto.inStock,
        });
      } else {
        if (product_name_exist) {
          throw new ExceptionResponse(
            HttpStatus.BAD_REQUEST,
            'Product is exist',
          );
        } else {
          return await this.productRepository.update(product_id, {
            name_product: updateProductDto.name_product,
            name_product_clone: product_name,
            description: updateProductDto.description,
            quantity: updateProductDto.quantity,
            inStock: updateProductDto.inStock,
          });
        }
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updateProductStatus(
    product_id: number,
    updateProductDto: UpdateProductDto,
  ) {
    try {
      const product = await this.getProductById(product_id);

      if (!product) {
        return new NotFoundException(`Product ${product_id} not found`);
      }
      console.log(product);

      const updatedStatus = await this.productRepository.update(
        product_id,
        updateProductDto,
      );
      return updatedStatus;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
