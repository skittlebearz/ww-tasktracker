import { Generated } from 'typeorm';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';


@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  parentProject: number;

  @Column()
  completionStatus: boolean;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column() // Units for timeEstimate are in hours, although this isn't set in stone
  timeEstimate: number;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;
}
