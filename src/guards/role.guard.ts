import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  
  @Injectable()
  export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.get<string[]>(
        'roles',
        context.getHandler(),
      );
  
      // If no roles are defined, allow access
      if (!requiredRoles || requiredRoles.length === 0) {
        return true;
      }
  
      const request = context.switchToHttp().getRequest();
      const userRole = request.role; 
      
      console.log('Request Body:', request);
      console.log('Request User:', request.user);
      // Check if the user's role matches one of the required roles
      if (!requiredRoles.includes(userRole)) {
        throw new ForbiddenException(
          `Access denied. Required roles: ${requiredRoles.join(', ')}`,
        );
      }
  
      return true;
    }
  }
  