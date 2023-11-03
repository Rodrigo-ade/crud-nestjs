import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MapperService } from '../../../common/mapper/mapper.service';
import { IUserRepository } from '../../application/repository/user.repository';
import { User } from '../../domain/user.domain';
import { UserEntity } from './entities/user.entity';

export class UserMysqlRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly mapperService: MapperService,
  ) {}

  async save(user: User): Promise<User> {
    const userEntity = this.mapperService.classToEntity(user, new UserEntity());
    const savedEntity = await this.userRepository.save(userEntity);
    return this.mapperService.entityToClass(savedEntity, new User());
  }

  async getAll(): Promise<User[]> {
    const userEntities = await this.userRepository.find();
    const users = userEntities.map((userEntity) =>
      this.mapperService.entityToClass(userEntity, new User()),
    );
    return users;
  }

  async getById(id: number): Promise<User> {
    const userEntity = await this.userRepository.findOne({ where: { id } });

    if (!userEntity) {
      throw new Error(`user #${id} do not exist`);
    }

    return this.mapperService.entityToClass(userEntity, new User());
  }

  async delete(id: number): Promise<boolean> {
    const userEntity = await this.userRepository.findOne({ where: { id } });

    if (!userEntity) {
      throw new Error(`user #${id} do not exist`);
    }
    await this.userRepository.delete(id);
    return true;
  }

  async update(id: number, user: User): Promise<User> {
    const userEntity = await this.userRepository.findOne({ where: { id } });

    if (!userEntity) {
      throw new Error(`user #${id} do not exist`);
    }
    this.userRepository.merge(userEntity, user);
    const savedUserEntity = await this.userRepository.save(userEntity);

    return this.mapperService.entityToClass(savedUserEntity, new User());
  }
}
