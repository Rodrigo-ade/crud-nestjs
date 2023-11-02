import { CreateUserDto } from '../../controller/dto/create-user.dto';
import { UpdateUserDto } from '../../controller/dto/update-user.dto';
import { User } from '../../domain/user.domain';

export interface IUserRepository {
  save(createUserDto: CreateUserDto): Promise<User>;
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User>;
  delete(id: number): Promise<boolean>;
  update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
}
