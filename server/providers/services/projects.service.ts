import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'server/entities/project.entity';
import { UserProject } from 'server/entities/user_project.entity';
//import { User } from 'server/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(UserProject)
    private userProjectRepository: Repository<UserProject>,
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

  async findAllForUser(userId: number): Promise<Project[]> {
    const userProjects = await this.userProjectRepository.find({
      where: { userId },
      relations: ['project'],
    });
    return userProjects.map((userProject) => userProject.project);
  }

  // addUsers(users: User[]) {

  // }
  //Currently unused, we're adding projects to users instead
}
