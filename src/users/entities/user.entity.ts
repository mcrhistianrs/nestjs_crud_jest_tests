import { Post } from '@prisma/client';

export class User {
  id: string;
  email: string;
  name?: string;
  posts: Post[];
}
