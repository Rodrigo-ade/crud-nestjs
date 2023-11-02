import * as fs from 'fs';
import { User } from 'src/modules/user/domain/user.domain';
import { IUserRepository } from '../../application/repository/user.repository';
import { CreateUserDto } from '../../controller/dto/create-user.dto';
import { UpdateUserDto } from '../../controller/dto/update-user.dto';

export class UserRepository implements IUserRepository {
  constructor(private readonly databasePath: string = 'src/data/users.json') {}

  async getAll(): Promise<User[]> {
    return await this.getUsers();
  }

  async getById(id: number): Promise<User> {
    const users = await this.getUsers();
    const user = users.find((tempUser) => tempUser.id == id);

    if (!user) {
      throw new Error(`The user ${id} do not exist.`);
    }

    return user;
  }

  async delete(id: number): Promise<boolean> {
    const users = await this.getUsers();
    const userToDeleteIndex = users.findIndex((tempUser) => tempUser.id == id);

    if (userToDeleteIndex === -1) {
      throw new Error(`The user ${id} do not exist.`);
    }

    users.splice(userToDeleteIndex, 1);
    this.saveUsers(users);
    return true;
  }

  async save(createUserDto: CreateUserDto): Promise<User> {
    const users = await this.getUsers();
    let newId = -1;

    users.forEach((tempU) => {
      if (tempU.id > newId) {
        newId = tempU.id;
      }
    });

    newId++;

    const userToSave = { id: newId, ...createUserDto };
    users.push(userToSave);

    this.saveUsers(users);
    return userToSave;
  }

  async getUsers(): Promise<User[]> {
    let users: User[];
    try {
      const file = fs.readFileSync(this.databasePath, { encoding: 'utf-8' });
      users = JSON.parse(file);
    } catch (error) {
      users = [];
    }
    return users;
  }

  saveUsers(users: User[]): void {
    fs.writeFileSync(this.databasePath, JSON.stringify(users));
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const users = await this.getUsers();
    const userIndex = users.findIndex((tempU) => tempU.id == id);

    if (userIndex === -1) {
      throw new Error(`The user with id: ${id} does not exist`);
    }

    const oldUser = users[userIndex];
    const updatedUser = { ...oldUser, ...updateUserDto };
    users[userIndex] = updatedUser;

    this.saveUsers(users);
    return updatedUser;
  }
}
