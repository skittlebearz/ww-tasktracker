import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'server/entities/task.entity';
import { TasksController } from 'server/controllers/api/tasks.controller';
import { TasksService } from '../providers/services/tasks.service';

@Module({
	imports: [TypeOrmModule.forFeature([Task])],
	controllers: [TasksController],
	providers: [TasksService],
	exports: [],
})
export class TasksModule {}