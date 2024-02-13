'use client';

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@nextui-org/react';
import React from 'react';
import { useFormState } from 'react-dom';

import FormButton from '@/components/common/form-button';

import * as actions from '@/actions';

type PostCreateFormProps = {
  slug: string;
};

export default function PostCreateForm({
  slug,
}: React.PropsWithChildren<PostCreateFormProps>) {
  const [formState, action] = useFormState(
    actions.createPost.bind(null, slug),
    { errors: {} }
  );

  return (
    <>
      <Popover placement="left">
        <PopoverTrigger>
          <Button color="primary">Create a post</Button>
        </PopoverTrigger>

        <PopoverContent>
          <form action={action}>
            <div className="flex flex-col gap-4 p-4 w-80">
              <h3 className="text-lg">Create a Post</h3>

              <Input
                name="title"
                label="Title"
                labelPlacement="outside"
                placeholder="Title"
                isInvalid={!!formState.errors.title}
                errorMessage={formState.errors.title?.join(', ')}
              />

              <Textarea
                name="content"
                label="Content"
                labelPlacement="outside"
                placeholder="content"
                isInvalid={!!formState.errors.content}
                errorMessage={formState.errors.content?.join(', ')}
              />

              {formState.errors._form && (
                <div className="p-2 bg-pink-200 border border-pink-500 rounded">
                  {formState.errors._form.join(', ')}
                </div>
              )}

              <FormButton>Create post</FormButton>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
}
