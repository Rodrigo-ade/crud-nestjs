import { Body, Controller, Get, Post, Patch, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from '../application/service/user.service';
import { User } from '../domain/user.domain';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/delete/:id')
  async delete(@Param('id') id: number): Promise<boolean> {
    return this.userService.delete(id);
  }

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<User> {
    return this.userService.getById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUser: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUser);
  }

  @Post()
  async save(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.save(createUserDto);
  }
}
