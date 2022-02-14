import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, Column } from 'typeorm';
import { Generated } from 'typeorm';
import { User } from './user.entity';
import { Task } from './task.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  @Generated('uuid') //This should or may not create a random unique contextId
  contextId: string;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @Column()
  leaderId: number;

  @ManyToMany(() => User, (user) => user.projects)
  user: User;
}
