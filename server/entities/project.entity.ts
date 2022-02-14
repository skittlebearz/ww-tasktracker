import { Generated } from 'typeorm';
import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Task } from './task.entity'
//import { UserProject } from './project_user.entity'; 

//TODO: Remove comments when other files are available
//TODO: Test functionality

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: String;

  @Column()
  @Generated("uuid") //This should or may not create a random unique contextId
  contextId: string;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @Column()
  leaderId: number;

  //@OneToMany(() => UserProject, (userProject) => userProject.user)
  //userProjects: userProject[];
}
