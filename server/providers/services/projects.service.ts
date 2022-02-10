import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'server/entities/project.entity';
import { User } from 'server/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  createProject(project: Project): Promise<Project> {
    return this.projectRepository.save(project);
  }

  findProjectById(id: number) {
    return this.projectRepository.findOne(id);
  }

  removeProject(project: Project) {
    this.projectRepository.delete(project);
  }

  findAllForUser(userId: number) : Promise<Project[]> {
		return this.projectRepository.find({
			where: { userId },
		}); 
  }

  addUsers(users: User[]) {
    
  }
}