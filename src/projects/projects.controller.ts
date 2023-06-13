import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsDto } from './dto';
import { ProjectEntity } from '../entities/project.entity';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from 'src/entities/user.entity';
import { ProjectsUserDto } from './dto/project_user.dto';

@Controller('projects')
export class ProjectsController {
  constructor(
    private projectsService: ProjectsService,
    private authService: AuthService,
  ) {}

  @Post('create-new-project')
  @UsePipes(ValidationPipe)
  async createNewProject(@Body() projectsDto: ProjectsDto) {
    console.log(projectsDto);
    return this.projectsService.createNewProject(projectsDto);
  }

  @Get('get-project-by-id/:project_id')
  async getProjectById(
    @Param('project_id') project_id: number,
  ): Promise<ProjectEntity | any> {
    return this.projectsService.getProjectById(project_id);
  }

  @Put('update-project/:project_id')
  async updateProject(
    @Param('project_id') project_id: number,
    @Body() projectDto: ProjectsDto,
  ) {
    return await this.projectsService.updateProjectById(project_id, projectDto);
  }

  @Put('update-project-status/:project_id')
  async updateStatusProject(
    @Param('project_id') project_id: number,
    @Body() body: any,
  ) {
    const update_status = await this.projectsService.updateStatusProject(
      project_id,
      body,
    );
    return [
      {
        status: 200,
        message: 'success',
        data: update_status,
      },
    ];
  }
  @Post('add-member')
  async assignProjectForUser(@Query() projectuser: ProjectsUserDto) {
    // console.log(projectuser)
    return this.projectsService.addMemberInProject(projectuser);
  }
}
