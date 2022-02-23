import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'server/entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  findAllForUser(userId: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: { userId },
    });
  }

  async findAllForProject(parentProject: number): Promise<Task[]> {
    const tasks = this.taskRepository.find({
      where: { parentProject },
    });
    return tasks;
  }


  createTask(task: Task): Promise<Task> {
    return this.taskRepository.save(task);
  }

  //createTaskForProject(task: Task): Promise<Task> {
  //  return this.taskRepository.save(task);
  //}

  findTaskById(id: number, userId: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: { userId, id },
    });
  }

  updateTaskById(id: number, userId: number): Promise<Task[]> {
    var task = this.taskRepository.findOne({
      where: { userId, id },
    });
    task[0].completionStatus = true;

    return this.taskRepository.save(task[0]);
  }

  removeTask(task: Task) {
    this.taskRepository.delete(task);
  }
}

