import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'server/entities/project.entity';
import { ProjectsController } from 'server/controllers/api/projects.controller';
import { ProjectsService } from '../providers/services/projects.service';
import { UsersService } from 'server/providers/services/users.service';
import { User } from 'server/entities/user.entity';
import { Role } from 'server/entities/role.entity';
import { UserRole } from 'server/entities/user_role.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Project, User, Role, UserRole])],
	controllers: [ProjectsController],
	providers: [ProjectsService, UsersService],
	exports: [],
})
export class ProjectsModule {}