import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { UserEntity } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from '../entities/project.entity';
import { AuthService } from 'src/auth/auth.service';
import { UserProjectEntity } from 'src/entities/user_project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ProjectEntity, UserProjectEntity]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, AuthService],
})
export class ProjectsModule {}
