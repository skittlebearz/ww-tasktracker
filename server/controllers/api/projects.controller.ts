import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { Project } from 'server/entities/project.entity';
import { User } from 'server/entities/user.entity';
import { ProjectsService } from 'server/providers/services/projects.service';
//import { UserProject } from 'server/entities/user_project.entity';

class ProjectTitle {
  title: string;
}

class NewData {
  users: User[]
}

@Controller()
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get('/projects')
  public async index(@JwtBody() jwtBody: JwtBodyDto) {
    const projects = await this.projectsService.findAllForUser(jwtBody.userId);
    return { projects };
  }

  @Get('/projects/:id')
  public async idIndex(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto) {
    const project = await this.projectsService.findProjectById(parseInt(id, 10));
    return { project };
  }

  @Post('/projects')
  public async create(@JwtBody() jwtBody: JwtBodyDto, @Body() title: ProjectTitle) {
    let project = new Project();
    project.title = title.title;
    project.leaderId = jwtBody.userId;

    //const userProject = new UserProject();
    //userProject.userId = jwtBody.userId;
    //userProject.projectId = project.id;
    //This should set up the many-many relationship, depending on userProject implementation

    project = await this.projectsService.createProject(project);
    return { project };
  }

  @Patch('/projects/:id')
  public async update(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto, @Body() updates: NewData) {
    for (let user of updates.users) {
      //let userProject = new UserProject();
      //userProject.userId = user.id;
      //userProject.projectId = id;
    }
    //I don't think adding new tasks works through a patch
  }

}