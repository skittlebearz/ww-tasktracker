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

  findAllForProject(parentProject: string): Promise<Task[]> {
    return this.taskRepository.find({
      where: { parentProject },
    });
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

  removeTask(task: Task) {
    this.taskRepository.delete(task);
  }
}
