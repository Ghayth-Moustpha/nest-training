import { Request } from 'express';

export interface CustomRequest extends Request {
  user?: any; // Adjust `any` to your actual `user` type if available.
  role?: string; // Adjust if roles are enums or more specific types.
}
