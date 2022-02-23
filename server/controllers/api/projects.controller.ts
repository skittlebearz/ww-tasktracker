import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { Project } from 'server/entities/project.entity';
import { User } from 'server/entities/user.entity';
import { UserRole } from 'server/entities/user_role.entity';
import { ProjectsService } from 'server/providers/services/projects.service';
import { UsersService } from 'server/providers/services/users.service';
import { RoleKey } from 'server/entities/role.entity';
//import { UserProject } from 'server/entities/user_project.entity';
import * as crypto from 'crypto';

class ProjectTitle {
  contents: string;
}

class NewData {
  users: User[];
}

class InviteBody {
  email: string;
  projectId: number;
}

@Controller()
export class ProjectsController {
  constructor(private projectsService: ProjectsService, private usersService: UsersService) {}

  @Get('/projects')
  public async index(@JwtBody() jwtBody: JwtBodyDto) {
    console.log(jwtBody.userId);
    const projects = await this.projectsService.findAllForUser(jwtBody.userId);
    return { projects };
  }

  @Get('/projects/:id/users')
  public async users(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto) {
    const users = await this.projectsService.findAllForProject(parseInt(id, 10));
    return { users };
  }

  @Get('/projectid/:contextId')
  public async contextIdIndex(@Param('contextId') contextId: string, @JwtBody() jwtBody: JwtBodyDto) {
    const id = await this.projectsService.getProjectId(contextId);
    return { id };
  }

  @Get('/projects/:id')
  public async idIndex(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto) {
    const project = await this.projectsService.findProjectById(parseInt(id, 10), jwtBody.userId);
    return { project };
  }

  @Post('/projects')
  public async create(@JwtBody() jwtBody: JwtBodyDto, @Body() title: ProjectTitle) {
    //Create the new project, could probably be improved with a better constructor
    let project = new Project();
    project.title = title.contents;
    project.leaderID = jwtBody.userId;
    project.contextId = crypto.randomBytes(16).toString('hex');

    project = await this.projectsService.createProject(project);

    //This should set up the many-many relationship, depending on userProject implementation
    //Add project to current user
    await this.usersService.addUserToProject(jwtBody.userId, project.id);

    //Create the userRole with the correct context and Role
    await this.usersService.addUserToRoleInContext(jwtBody.userId, project.contextId, RoleKey.LEADER);

    return { project };
  }

  @Post('/projects/:id/adduser')
  public async update(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto, @Body() invite: InviteBody) {
    var userId = await this.usersService.getIdFromEmail(invite.email);
    const user = await this.usersService.addUserToProject(userId, invite.projectId);
    return { user };
  }
}
