import { db } from '@/db/index';
import type { Post } from '@prisma/client';

export type PostWithTopicAndUserAndCount = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

export function searchPosts(
  term: string
): Promise<PostWithTopicAndUserAndCount[]> {
  return db.post.findMany({
    where: {
      OR: [{ title: { contains: term } }, { content: { contains: term } }],
    },

    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
  });
}

export function fetchPostsByTopicSlug(
  slug: string
): Promise<PostWithTopicAndUserAndCount[]> {
  return db.post.findMany({
    where: { topic: { slug: slug } },

    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}

export function fetchTopPosts(): Promise<PostWithTopicAndUserAndCount[]> {
  return db.post.findMany({
    orderBy: [
      {
        comments: {
          _count: 'desc',
        },
      },
    ],

    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },

    take: 5,
  });
}
