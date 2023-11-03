import { Injectable, Inject, HttpException } from '@nestjs/common';
import { CreateUserDto } from '../../controller/dto/create-user.dto';
import { UpdateUserDto } from '../../controller/dto/update-user.dto';
import { IUserRepository } from '../repository/user.repository';

import { User } from '../../domain/user.domain';
import { MapperService } from '../../../common/mapper/mapper.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MYSQL_REPOSITORY')
    private readonly userRepository: IUserRepository,
    private readonly mapperService: MapperService,
  ) {}

  save(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user: User = this.mapperService.dtoToClass(
        createUserDto,
        new User(),
      );

      return this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }

  async getAll(): Promise<User[]> {
    try {
      return await this.userRepository.getAll();
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }

  async getById(id: number): Promise<User> {
    try {
      return await this.userRepository.getById(id);
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user: User = this.mapperService.dtoToClass(
        updateUserDto,
        new User(),
      );
      return await this.userRepository.update(id, user);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
