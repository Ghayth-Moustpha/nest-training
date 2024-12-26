import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { PrismaService } from 'src/prisma/prisma.service';
  import { Request, Response, NextFunction } from 'express';
  
  @Injectable()
  export class AuthMiddleware implements NestMiddleware {
    constructor(
      private readonly jwtService: JwtService,
      private readonly prismaService: PrismaService,
    ) {}
  
    async use(req: Request, res: Response, next: NextFunction) {
      const authHeader = req.headers['authorization'];
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Authorization header missing or invalid.');
      }
  
      const token = authHeader.split(' ')[1];
  
      try {
        const payload = this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET,
        });
  
        // Query the database for the user's role and data
        const user = await this.prismaService.user.findUnique({
          where: { id: payload.sub },
          include: {
            admin: true,
            teacher: true,
            student: true,
          },
        });
  
        if (!user) {
          throw new UnauthorizedException('User not found.');
        }
  
        // Attach user and role information to the request object
        req['user'] = {
          id: user.id,
          name: `${user.fname} ${user.lname}`,
          email: user.email,
          role: this.determineRole(user),
        };
  
        next();
      } catch (error) {
        throw new UnauthorizedException('Invalid or expired token.');
      }
    }
  
    private determineRole(user: any): string {
      if (user.admin) return 'admin';
      if (user.teacher) return 'teacher';
      if (user.student) return 'student';
      return 'user';
    }
  }
  