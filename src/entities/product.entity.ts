import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { UserProductEntity } from './user_product.entity';
import { CategoryProductEntity } from './category_product';

@Entity('product')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column({ nullable: true })
  name_product: string;

  @Column({ nullable: true })
  name_product_clone: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  status: number;

  @Column({ nullable: true })
  inStock: number;

  @ManyToOne(() => UserEntity, (user) => user.user_id)
  created_by?: UserEntity;

  @OneToMany(() => UserProductEntity, (user) => user.products)
  products_bought_user?: UserProductEntity[];

  @OneToMany(() => CategoryProductEntity, (category) => category.products)
  product_category: CategoryProductEntity[];
}
