// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Post,
//   Patch,
//   Query,
// } from '@nestjs/common';
// import { TasksService } from './tasks.service';
// import { Task } from './task-status.enum';
// // import {TaskStatus} from './task.model'
// // import { title } from 'process';
// import { CreateTaskDto } from './dto/create-task.dto';
// import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
// import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
// @Controller('tasks')
// export class TasksController {
//   constructor(private tasksService: TasksService) {}

// @Get()
// getAllTasks(): Task[] {
//   return this.tasksService.getAllTasks();
// }

// @Get('/:id')
// getTaskById(@Param('id') id: string): Task {
//   return this.tasksService.getTaskById(id);
// }

// @Get()
// getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
//   if (Object.keys(filterDto).length) {
//   } else {
//     return this.tasksService.getAllTasks();
//   }
// }

// // @Post()
// // createTask(@Body() body) {
// //   console.log('body', body);
// // }

// // @Post()
// // createTask(
// //   @Body('title') title: string,
// //   @Body('description') description: string,
// // ): Task {
// //   return this.tasksService.createTask(title, description);
// // }

// @Post()
// createTask(@Body() createTaskDto: CreateTaskDto): Task {
//   return this.tasksService.createTask(createTaskDto);
// }

// @Delete('/:id')
// deleteTask(@Param('id') id: string): void {
//   return this.tasksService.deleteTask(id);
// }

// // @Patch('/:id/status')
// // updateTaskStatus(
// //   @Param('id') id: string,
// //   @Body('status') status: TaskStatus,
// // ): Task {
// //   return this.tasksService.updateTaskStatus(id, status);
// // }

// @Patch('/:id/status')
// updateTaskStatus(
//   @Param('id') id: string,
//   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
// ): Task {
//   const { status } = updateTaskStatusDto;
//   return this.tasksService.updateTaskStatus(id, status);
// }
//}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
// import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  // get task by id using param
  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
