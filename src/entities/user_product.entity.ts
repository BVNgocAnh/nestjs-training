import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { ProductEntity } from './product.entity';

@Entity('user_product')
export class UserProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'user_product_id' })
  user_product_id: number;

  @ManyToOne(() => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  users: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.product_id)
  @JoinColumn({ name: 'product_id' })
  products: ProductEntity;
}
