import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { ProjectEntity } from './entities/project.entity';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { NotificationModule } from './notification/notification.module';
import { PostModule } from './post/post.module';
import { ProductEntity } from './entities/product.entity';
import { NotificationEntity } from './entities/notification.entity';
import { PostEntity } from './entities/post.entity';
import { ReactionModule } from './reaction/reaction.module';
import { ReactionPostEntity } from './entities/reaction.entity';
import { CommentModule } from './comment/comment.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ChatModule } from './socket-server/chat.module';
import { ConnectionEntity } from './entities/connection.entity';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [
        UserEntity,
        ProjectEntity,
        ProductEntity,
        NotificationEntity,
        PostEntity,
        ReactionPostEntity,
        ConnectionEntity,
      ],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    AuthModule,
    UsersModule,
    ProjectsModule,
    ProductsModule,
    CategoryModule,
    NotificationModule,
    PostModule,
    ReactionModule,
    CommentModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
