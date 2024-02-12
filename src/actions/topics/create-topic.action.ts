'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';
import type { Topic } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import creatTopicSchema from '@/actions/topics/create-topic.validator';

type CreateTopicFormState = {
  errors: {
    name?: string[];
    description?: string[];

    _form?: string[];
  };
};

export async function createTopicAction(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be sign in.'],
      },
    };
  }

  const name = formData.get('name');
  const description = formData.get('description');

  const result = creatTopicSchema.safeParse({ name, description });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
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
        _form: ['Something went wrong'],
      },
    };
  }

  revalidatePath(paths.home());
  redirect(paths.topicShow({ slug: topic.slug }));
}
