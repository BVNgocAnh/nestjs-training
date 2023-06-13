import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { CategoryProductEntity } from './category_product';
import { UserEntity } from './user.entity';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column()
  name_category: string;

  @ManyToOne(() => UserEntity, (user) => user.user_id)
  created_by?: UserEntity;

  @OneToMany(() => CategoryProductEntity, (product) => product.categories)
  category_product: CategoryProductEntity[];
}
