import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthService } from 'src/auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryProductEntity } from 'src/entities/category_product';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { CategoryEntity } from 'src/entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    private authService: AuthService,

    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryProductEntity)
    private category_productRepository: Repository<CategoryProductEntity>,
  ) {}

  async createCategory(user_id: number, createCategoryDto: CreateCategoryDto) {
    try {
      const user = await this.authService.getUserById(user_id);
      console.log('user:', user);

      if (!user) {
        return new NotFoundException(`User have ${user_id} not found`);
      }

      const new_category = this.categoryRepository.create({
        ...createCategoryDto,
        created_by: user,
      });

      return await this.categoryRepository.save(new_category);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
