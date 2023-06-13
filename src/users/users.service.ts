import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { In, Repository } from 'typeorm';
import { EntityRepository } from 'typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { UserProductEntity } from 'src/entities/user_product.entity';
import { AuthService } from 'src/auth/auth.service';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,

    @InjectRepository(UserProductEntity)
    private user_productRepository: Repository<UserProductEntity>,

    private authService: AuthService,
  ) {}

  async createOrder(user_id: number, body: any) {
    try {
      const user = await this.authService.getUserById(user_id);
      if (!user) {
        throw new NotFoundException(`User not found`);
      }
      const product = await this.productRepository.find({
        where: {
          product_id: In(body.product_id),
        },
      });

      const modifiedProducts = product.map(async (product) => {
        await this.user_productRepository
          .create({
            users: { user_id: user.user_id },
            products: { product_id: product.product_id },
          })
          .save();
      });
      return modifiedProducts;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
