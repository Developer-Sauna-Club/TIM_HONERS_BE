import { Injectable } from '@nestjs/common';
import { CreateHelloDto } from './dto/create-hello.dto';
import { UpdateHelloDto } from './dto/update-hello.dto';
import { PrismaService } from 'src/prisma.service';
import { Hello } from '@prisma/client';

@Injectable()
export class HelloService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateHelloDto) {
    return this.prisma.hello.create({
      data,
    });
  }

  findAll(): Promise<Hello[]> {
    return this.prisma.hello.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} hello`;
  }

  update(id: number, updateHelloDto: UpdateHelloDto) {
    return `This action updates a #${id} hello`;
  }

  remove(id: number) {
    return `This action removes a #${id} hello`;
  }
}
