import { Generated } from 'typeorm';
import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
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

  //@OneToMany(() => Task, (task) => project.task)
  //tasks: task[];

  @Column()
  leaderId: number;

  //@OneToMany(() => UserProject, (userProject) => userProject.user)
  //userProjects: userProject[];
}
