export class UserResponseDto {
  user: {
      email: string;
      role: string;
      name: string;
  };
  token: string;

  constructor(email: string, role: string, name: string, token: string) {
      this.user = { email, role, name };
      this.token = token;
  }
}