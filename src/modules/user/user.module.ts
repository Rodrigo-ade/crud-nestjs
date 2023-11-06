import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './application/service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infraestructure/persistence/entities/user.entity';

import { UserMysqlRepository } from './infraestructure/persistence/user.mysql.repository';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CommonModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'USER_MYSQL_REPOSITORY',
      useClass: UserMysqlRepository,
    },
  ],
})
export class UserModule {}
