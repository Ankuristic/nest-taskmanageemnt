// import { Injectable, NotFoundException } from '@nestjs/common';
// import { Task, TaskStatus } from './task-status.enum';
// import { v4 as uuid } from 'uuid';
// import { CreateTaskDto } from './dto/create-task.dto';
// import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

// @Injectable()
// export class TasksService {
//   constructor(
//     @InjectRepository(TasksRepository)
//     private tasksRepository: TasksRepository,
//   );

//   getTaskById(id:string) {

//   }
//   private tasks: Task[] = [];
//   getAllTasks(): Task[] {
//     return this.tasks;
//   }
//   getTaskById(id: string): Task {
//     // try to get task
//     //if not found trow an error (404 not found)
//     // otherwise retuen the found task
//     const found = this.tasks.find((task) => task.id === id);
//     if (!found) {
//       throw new NotFoundException(`Task with ID "${id}" not found `);
//     }
//     return found;
//   }
//   getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
//     const { status, search } = filterDto;
//     let tasks = this.getAllTasks();
//     if (status) {
//       tasks = tasks.filter((task) => task.status === status);
//     }
//     if (search) {
//       tasks = tasks.filter(
//         (task) =>
//           task.title.includes(search) || task.description.includes(search),
//       );
//     }
//     return tasks;
//   }
//   //   createTask(title: string, description: string): Task {
//   //     const task: Task = {
//   //       id: uuid(),
//   //       title,
//   //       description,
//   //       status: TaskStatus.OPEN,
//   //     };
//   //     this.tasks.push(task);
//   //     return task;
//   //   }
//   createTask(createTaskDto: CreateTaskDto): Task {
//     const { title, description } = createTaskDto;
//     const task: Task = {
//       id: uuid(),
//       title,
//       description,
//       status: TaskStatus.OPEN,
//     };
//     this.tasks.push(task);
//     return task;
//   }
//   deleteTask(id: string): void {
//     const found = this.getTaskById(id);
//     this.tasks = this.tasks.filter((task) => task.id !== found.id);
//   }
//   updateTaskStatus(id: string, status: TaskStatus) {
//     const task = this.getTaskById(id);
//     task.status = status;
//     return task;
//     // set property status undefinded
//   }
//}

// import { Injectable, NotFoundException } from '@nestjs/common';
// import { TaskStatus } from './task-status.enum';
// import { CreateTaskDto } from './dto/create-task.dto';
// import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
// import { TasksRepository } from './tasks.repository';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Task } from './task.entity';
// import { User } from '../auth/user.entity';

// @Injectable()
// export class TasksService {
//   constructor(
//     @InjectRepository(TasksRepository)
//     private tasksRepository: TasksRepository,
//   ) {}

//   getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
//     return this.tasksRepository.getTasks(filterDto, user);
//   }

//   async getTaskById(id: string, user: User): Promise<Task> {
//     const found = await this.tasksRepository.findOne({ where: { id, user } });

//     if (!found) {
//       throw new NotFoundException(`Task with ID "${id}" not found`);
//     }

//     return found;
//   }

//   //   async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
//   //     const { title, description } = createTaskDto;
//   //     const task = this.tasksRepository.create({
//   //       title,
//   //       description,
//   //       status: TaskStatus.OPEN,
//   //     });

//   //     await this.tasksRepository.save(task);
//   //     return task;

//   //     // return this.tasksRepository.createTask(createTaskDto);
//   //   }

//   createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
//     return this.tasksRepository.createTask(createTaskDto, user);
//   }

//   async deleteTask(id: string, user: User): Promise<void> {
//     const result = await this.tasksRepository.delete({ id, user });

//     if (result.affected === 0) {
//       throw new NotFoundException(`Task with ID "${id}" not found`);
//     }
//   }

//   async updateTaskStatus(
//     id: string,
//     status: TaskStatus,
//     user: User,
//   ): Promise<Task> {
//     const task = await this.getTaskById(id, user);

//     task.status = status;
//     await this.tasksRepository.save(task);

//     return task;
//   }
// }

import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);

    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }
}
