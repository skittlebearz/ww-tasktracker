import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Project } from './project.entity';
import { RefreshToken } from './refresh_token.entity';
import { UserRole } from './user_role.entity';
import { Task } from './task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  passwordHash: string;

  @OneToMany(() => RefreshToken, (token) => token.user)
  refreshTokens: RefreshToken[];

  @OneToMany(() => UserRole, (userRole) => userRole.user, { cascade: true })
  userRoles: UserRole[];

  @OneToMany(() => Task, (task) => task.user, { cascade: true })
  tasks: Task[];

  @ManyToMany(() => Project, (project) => project.user, { cascade: true })
  @JoinTable()
  projects: Project[];
}
