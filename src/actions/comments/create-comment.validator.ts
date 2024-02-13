import { z } from 'zod';

const createCommentSchema = z.object({
  content: z.string().min(3),
});

export default createCommentSchema;
