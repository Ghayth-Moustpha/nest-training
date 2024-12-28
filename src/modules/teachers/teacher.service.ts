import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ITeacher } from './teacher.interface';


@Injectable()
export class TeachersService {
  constructor(private readonly prisma: PrismaService) {}

  private mapToTeacherResponse(teacher: any): ITeacher {
    return {
      id: teacher.id,
      fname: teacher.user.fname,
      lname: teacher.user.lname,
      email: teacher.user.email,
      bio: teacher.user.profile?.bio || '',
      image: teacher.user.profile?.image || '',
      title: teacher.title,
    };
  }

  async create(createTeacherDto: CreateTeacherDto): Promise<ITeacher> {
    const { email, fname, lname, password, Bio, image, title } = createTeacherDto;

    const teacher = await this.prisma.teacher.create({
      data: {
        title,
        user: {
          create: {
            email,
            fname,
            lname,
            password,
            profile: {
              create: { bio: Bio, image },
            },
          },
        },
      },
      include: { user: { include: { profile: true } } },
    });

    return this.mapToTeacherResponse(teacher);
  }

  async findAll(): Promise<ITeacher[]> {
    const teachers = await this.prisma.teacher.findMany({
      include: { user: { include: { profile: true } } },
    });

    return teachers.map(this.mapToTeacherResponse);
  }

  async findOne(id: number): Promise<ITeacher> {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id },
      include: { user: { include: { profile: true } } },
    });

    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }

    return this.mapToTeacherResponse(teacher);
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto): Promise<ITeacher> {
    const teacher = await this.findOne(id);

    const updatedTeacher = await this.prisma.teacher.update({
      where: { id },
      data: {
        title: updateTeacherDto.title || teacher.title,
        user: {
          update: {
            fname: updateTeacherDto.fname || teacher.fname,
            lname: updateTeacherDto.lname || teacher.lname,
            profile: {
              update: {
                bio: updateTeacherDto.Bio || teacher.bio,
                image: updateTeacherDto.image || teacher.image,
              },
            },
          },
        },
      },
      include: { user: { include: { profile: true } } },
    });

    return this.mapToTeacherResponse(updatedTeacher);
  }

  async remove(id: number): Promise<void> {
    const teacher = await this.findOne(id);
    await this.prisma.teacher.delete({ where: { id } });
  }
}
