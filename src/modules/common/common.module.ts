import { Module } from '@nestjs/common';
import { MapperService } from './mapper/mapper.service';

@Module({
  providers: [MapperService],
  exports: [MapperService],
})
export class CommonModule {}
