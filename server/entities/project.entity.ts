import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Generated } from 'typeorm';
import { Task } from './task.entity';
import { UserProject } from './user_project.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  @Generated('uuid') //This may or may not create a random unique contextId
  contextId: string;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @Column()
  leaderID: number;

  @OneToMany(() => UserProject, (userProject) => userProject.project)
  userProjects: UserProject[];
}
