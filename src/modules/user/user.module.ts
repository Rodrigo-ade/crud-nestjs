import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './application/service/user.service';
import { UserRepository } from './infraestructure/persistence/user.json.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'USER_REPOSITORY',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
