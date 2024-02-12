'use client';

import { Button } from '@nextui-org/react';
import React from 'react';
import { useFormStatus } from 'react-dom';

type FormButtonProps = {};

export default function FormButton({
  children,
}: React.PropsWithChildren<FormButtonProps>) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending}>
      {children}
    </Button>
  );
}
