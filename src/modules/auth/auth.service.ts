import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { Role } from './roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly Userservice : UserService , 
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<UserResponseDto> {
    const { email, password } = loginUserDto;
    const user = await this.Userservice.findByemil(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password.');
    }


    const role = this.determineRole(user);

    const payload = { 
      sub: user.email,  
      role };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    const userResponse = {
      name: `${user.fname} ${user.lname}`,
      email: user.email,
      role,
      token,
    }
    return userResponse;
  };
  


  async verifyToken (token: string) : Promise<User> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const email  = payload.sub;  
      const user = await this.Userservice.findByemil(email) ;
      if (!user) {
        throw new UnauthorizedException('User not found.');
      }
    return user ; 

  }catch (error) {
    throw new UnauthorizedException('Invalid or expired token.');
  } 

}
  public determineRole(user: any): Role {
    if (user.admin) return Role.Admin ;
    if (user.teacher) return Role.Teacher;
    if (user.student) return Role.Student;
    
  }
}
