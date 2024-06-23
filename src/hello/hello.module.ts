import { Module } from '@nestjs/common';
import { HelloService } from './hello.service';
import { HelloController } from './hello.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [HelloController],
  providers: [HelloService, PrismaService],
})
export class HelloModule {}
