'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';
import type { Post, Topic } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import createPostSchema from '@/actions/posts/create-post.validator';

type CreatePostFormState = {
  errors: {
    title?: string[];
    content?: string[];

    _form?: string[];
  };
};

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ['You must be sign in.'],
      },
    };
  }

  const title = formData.get('title');
  const content = formData.get('content');

  const result = createPostSchema.safeParse({ title, content });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let topic: Topic | null;
  let post: Post;

  try {
    topic = await db.topic.findFirst({ where: { slug } });

    if (!topic) {
      return {
        errors: {
          _form: ['Cannot find topic'],
        },
      };
    }

    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,

        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    }

    return {
      errors: {
        _form: ['Failed to create post.'],
      },
    };
  }

  revalidatePath(paths.topicShow({ slug: topic.slug }));
  redirect(paths.postShow({ slug: topic.slug, postId: post.id }));
}
