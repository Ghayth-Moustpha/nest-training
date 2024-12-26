import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authservice: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
   

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization header missing or invalid');
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify the token asynchronously
      const user = await this.authservice.verifyToken(token);

      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      console.log('User:', user);
      request.user = user;

      // Determine the role asynchronously (if applicable)
      const role = await this.authservice.determineRole(user);
      console.log('Role:', role);
      request.role = role;

      return true;
    } catch (error) {
      console.error('Authentication error:', error.message);
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
