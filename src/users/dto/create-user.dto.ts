import { Post } from '@prisma/client';

export class CreateUserDto {
  email: string;
  name?: string;
  post: Post[];
}
