import { z } from 'zod';

const creatTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: 'Must be lowercase letters or dashes without space.',
    }),
  description: z.string().min(10),
});

export default creatTopicSchema;
