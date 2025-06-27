import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: MongoRepository<Task>,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.create(createTaskDto);

    return this.taskRepository.save({ ...task, completed: false });
  }

  async findAll() {
    return this.taskRepository.find();
  }

  async findOne(id: string) {
    return this.taskRepository.findOneBy(id);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const existing = await this.taskRepository.findOneBy(id);
    if (!existing) {
      throw new NotFoundException('Task not found');
    }
    const taskUpdated = this.taskRepository.merge(existing, updateTaskDto);

    return this.taskRepository.save(taskUpdated);
  }

  async complete(id: string) {
    const existing = await this.taskRepository.findOneBy(id);
    if (!existing) {
      throw new NotFoundException('Task not found');
    }

    const taskUpdated = this.taskRepository.merge(existing, {
      completed: true,
    });

    return this.taskRepository.save(taskUpdated);
  }

  async remove(id: string) {
    const existing = await this.taskRepository.findOneBy(id);
    if (!existing) {
      throw new NotFoundException('Task not found');
    }
    const a = await this.taskRepository.delete(id);

    if (a.affected === 0) {
      throw new NotFoundException('Task not found');
    }
    return { message: 'Task deleted successfully' };
  }
}
