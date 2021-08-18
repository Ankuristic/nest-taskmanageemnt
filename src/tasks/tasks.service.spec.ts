import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  createTask: jest.fn(),
});

const mockUser = {
  username: 'Ankur',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  // dummy module
  beforeEach(async () => {
    // initialize a nestjs module with tasksservice and taskrepository
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  // get all task
  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      // expect(tasksRepository.getTasks).not.toHaveBeenCalled();
      //call tasksService,getTasks,which should then call the repository
      // expect(tasksRepository.getTasks).toHaveBeenCalled();
      tasksRepository.getTasks.mockResolvedValue('someValue');
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  // get task by id

  describe(`getTasksById`, () => {
    it('calls TasksRepository.findOne and returns the result', async () => {
      const mockTask = {
        title: 'Test title',
        description: 'everything cool',
        id: 'someId',
        status: TaskStatus.OPEN,
      };
      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('someId', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('calls TasksRepository.findOne and handles an error', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // create task
  describe('createTask', () => {
    it('calls TaskRepository.createTask and return the result', async () => {
      // const mockdto = {
      //   title: 'hello everywhere',
      //   description: 'everytinhg cool',
      // };
      tasksRepository.createTask.mockResolvedValue(CreateTaskDto, mockUser);
      // const result = await tasksService.createTask(CreateTaskDto, mockUser);
      expect(tasksRepository.createTask).toEqual(CreateTaskDto);
    });
  });

  //update
  describe('updateTaskStatus', () => {
    it('calls getTaskbyId and save it', async () => {
      const mockTask = {
        id: 'hello',
        status: TaskStatus.IN_PROGRESS,
      };
      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('someId', mockUser);
      expect(result).toEqual('mockTask');
    });
  });

  //delete
  describe('deleteTask', () => {
    it('calls tasksRepository.delete and returns the result', async () => {
      const mockTask = {
        title: 'Test title',
        description: 'everything cool',
        id: 'hello',
        status: TaskStatus.OPEN,
      };
      tasksRepository.deleteTask.mockResolvedValue(mockTask);
      const result = await tasksService.deleteTask('hello', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('calls tasksRepository.delete and handles an error', async () => {
      tasksRepository.delete.mockResolvedValue(null);
      expect(tasksService.deleteTask('someId', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
