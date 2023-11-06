import { User } from '../../domain/user.domain';

export interface IUserRepository {
  save(user: User): Promise<User>;
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User>;
  delete(id: number): Promise<boolean>;
  update(id: number, user: User): Promise<User>;
}
