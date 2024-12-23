import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<UserResponseDto> {
    const { email, password } = loginUserDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        admin: true,
        teacher: true,
        student: true,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const role = this.determineRole(user);
    const payload = { sub: user.id, role };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });

    return {
      id: user.id,
      name: `${user.fname} ${user.lname}`,
      email: user.email,
      role,
      token,
    };
  }

  private determineRole(user: any): string {
    if (user.admin) return 'admin';
    if (user.teacher) return 'teacher';
    if (user.student) return 'student';
    return 'user'; 
  }
}
