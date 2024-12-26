import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';

  import { Observable } from 'rxjs';
  import { AUTH_REQUIRED_KEY } from 'src/decorators/auth-required.decorator';
import { AuthService } from 'src/modules/auth/auth.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private readonly reflector: Reflector,
      private readonly authservice: AuthService 
    ) {}
  
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const isAuthRequired = this.reflector.get<boolean>(
        AUTH_REQUIRED_KEY,
        context.getHandler(),
      );
  
      if (!isAuthRequired) {
        return true; // If the route doesn't require authentication, allow access
      }
  
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers['authorization'];
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Authorization header missing or invalid.');
      }
  
      const token = authHeader.split(' ')[1];
  
      const user = this.authservice.verifyToken(token) ; 
      
      if (!user) {
        return false ; 
      }
    
      request.user = user ; 
      request.role = this.authservice.determineRole(user) ; 
      
        return true;
      
    }
  
 
  }
  