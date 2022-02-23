import { Body, Controller, Delete, Get, HttpException, Param, Post } from '@nestjs/common';
import { identity } from 'lodash';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { Task } from 'server/entities/task.entity';
import { TasksService } from 'server/providers/services/tasks.service';

class TaskPostBody {
  parentProject: number;
  userId: number;
  completionStatus: boolean;
  title: string;
  description: string;
  timeEstimate: number;
}

@Controller()
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get('/tasks')
  // public async index(@JwtBody() jwtBody: JwtBodyDto) {
  //   const tasks = await this.tasksService.findAllForUser(jwtBody.userId);
  //   return { tasks };
  // }

  @Get('/projects/:id/tasks')
  public async projIdIndex(@Param('id') id: string) {
    const tasks = await this.tasksService.findAllForProject(parseInt(id, 10));
    return { tasks };
  }

  @Post('/projects/:id/task')
  public async create(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto, @Body() body: TaskPostBody) {
    let task = new Task();
    task.userId = body.userId;
    task.parentProject = body.parentProject;
    task.completionStatus = body.completionStatus;
    task.title = body.title;
    task.description = body.description;
    task.timeEstimate = body.timeEstimate;
    task.projectId = body.parentProject;
      task = await this.tasksService.createTask(task);
    return { task };
  }

  @Get('/tasks/:id')
  public async idIndex(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto) {
    const task = await this.tasksService.findTaskById(parseInt(id, 10), jwtBody.userId);
    return { task };
  }

  @Post('tasks/:id/')
  public async update(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto, @Body() body: TaskPostBody) {
    let task = new Task;
    task.id = parseInt(id, 10);
    task.userId = body.userId;
    task.parentProject = body.parentProject;
    task.completionStatus = true;
    task.title = body.title;
    task.description = body.description;
    task.timeEstimate = body.timeEstimate;
    task.projectId = body.parentProject;
      task = await this.tasksService.updateTask(task);
    return { task };
  }
}
