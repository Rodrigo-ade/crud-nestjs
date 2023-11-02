import { Injectable, Inject, HttpException } from '@nestjs/common';
import { CreateUserDto } from '../../controller/dto/create-user.dto';
import { UpdateUserDto } from '../../controller/dto/update-user.dto';
import { IUserRepository } from '../repository/user.repository';

import { User } from '../../domain/user.domain';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: IUserRepository,
  ) {}

  save(createUserDto: CreateUserDto): Promise<User> {
    try {
      return this.userRepository.save(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async getAll(): Promise<User[]> {
    try {
      return await this.userRepository.getAll();
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async getById(id: number): Promise<User> {
    try {
      return await this.userRepository.getById(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.userRepository.update(id, updateUserDto);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
