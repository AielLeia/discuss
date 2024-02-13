import { db } from '@/db/index';
import type { Post } from '@prisma/client';

export type PostWithTopicAndUserAndCount = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

export function fetchPostsByTopicSlug(
  slug: string
): Promise<PostWithTopicAndUserAndCount[]> {
  return db.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}
