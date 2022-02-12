import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'server/entities/project.entity';
import { ProjectsController } from 'server/controllers/projects.controller';
import { ProjectsService } from '../providers/services/projects.service';

@Module({
	imports: [TypeOrmModule.forFeature([Project])],
	controllers: [ProjectsController],
	providers: [ProjectsService],
	exports: [],
})
export class ProjectsModule {}