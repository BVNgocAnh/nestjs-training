import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { CategoryEntity } from './category.entity';

@Entity('category_product')
export class CategoryProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'category_product_id' })
  category_product_id: number;

  @ManyToOne(() => CategoryEntity, (category) => category.category_id)
  @JoinColumn({ name: 'category_id' })
  categories: CategoryEntity;

  @ManyToOne(() => ProductEntity, (product) => product.product_id)
  @JoinColumn({ name: 'product_id' })
  products: ProductEntity;
}
