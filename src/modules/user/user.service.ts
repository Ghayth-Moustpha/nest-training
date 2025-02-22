import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterStudentDto, CreateAdminDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async registerStudent(data: RegisterStudentDto) {
    const { email, password, ...rest } = data;

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new ConflictException('Email already exists.');

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        profile: { create: {} }, // Create an empty Profile record
        student: { create: {} }, // Create a Student record
        ...rest,
      },
    });
  }

  async createAdmin(data: CreateAdminDto) {
    const { email, password, ...rest } = data;

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new ConflictException('Email already exists.');

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        profile: { create: {} }, // Create an empty Profile record
        admin: { create: {} }, // Create an Admin record
        ...rest,
      },
    });
  }



  async findByemil(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
          where: { email },
          include: {
            admin: true,
            teacher: true,
            student: true,
          },
        });
  }
}
