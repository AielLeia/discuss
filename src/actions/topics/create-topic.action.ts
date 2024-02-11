'use server';

import creatTopicSchema from '@/actions/topics/create-topic.validator';

export async function createTopicAction(formData: FormData) {
  const name = formData.get('name');
  const description = formData.get('description');

  const result = creatTopicSchema.safeParse({ name, description });

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
  }
  // TODO : revalidate the homepage
}
