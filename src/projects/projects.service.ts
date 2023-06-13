import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectsDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ProjectEntity } from '../entities/project.entity';
import { ProjectsUserDto } from './dto/project_user.dto';
import { EntityRepository } from 'typeorm';
import { UserProjectEntity } from 'src/entities/user_project.entity';
@EntityRepository(ProjectEntity)
export class ProjectsRepository extends Repository<ProjectEntity> {}

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(UserProjectEntity)
    private user_projectRepository: Repository<UserProjectEntity>,
  ) {}

  async createNewProject(projectDto: ProjectsDto): Promise<ProjectEntity> {
    try {
      const { name_project } = projectDto;
      const project = await this.projectRepository
        .create({
          name_project,
        })
        .save();
      return project;
    } catch (error) {
      throw new Error();
    }
  }

  async getProjectById(project_id: number): Promise<ProjectEntity | any> {
    try {
      const project = await this.projectRepository.findOne({
        where: { project_id },
        relations: ['project_have_user', 'project_have_user.users'],
      });

      if (!project) {
        throw new NotFoundException(`Project with ID ${project_id} not found`);
      }
      return project;
    } catch (e) {
      throw e;
    }
  }

  async updateProjectById(
    project_id: number,
    projectDto: ProjectsDto,
  ): Promise<ProjectEntity | any> {
    try {
      const project = await this.projectRepository.findOne({
        where: { project_id },
      });
      if (!project) {
        throw new NotFoundException(`Project with ID ${project_id} not found`);
      }
      const updateProject = this.projectRepository.update(
        project_id,
        projectDto,
      );
      return updateProject;
    } catch (e) {
      throw e;
    }
  }

  async updateStatusProject(project_id: number, body: any) {
    try {
      const project = await this.projectRepository.findOne({
        where: { project_id },
      });
      if (!project) {
        throw new NotFoundException(`Project with ID ${project_id} not found`);
      }
      return await this.projectRepository.update(
        { project_id: project_id },
        { project_status: body.project_status },
      );
    } catch (error) {
      throw error;
    }
  }

  async addMemberInProject(projectuser: ProjectsUserDto) {
    try {
      const project = await this.getProjectById(+projectuser.project_id);
      const user = await this.userRepository.findOne({
        where: { user_id: +projectuser.user_id },
      });
      if (!project || !user) {
        throw new NotFoundException(`${projectuser.project_id} not found`);
      }
    } catch (e) {
      throw e;
    }
  }
}
