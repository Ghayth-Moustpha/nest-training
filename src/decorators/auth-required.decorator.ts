import { SetMetadata } from '@nestjs/common';

export const AUTH_REQUIRED_KEY = 'auth_required';
export const AuthRequired = () => SetMetadata(AUTH_REQUIRED_KEY, true);
