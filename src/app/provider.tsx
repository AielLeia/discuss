'use client';

import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

type ProvidersProps = {};

export default function Providers({
  children,
}: React.PropsWithChildren<ProvidersProps>) {
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
}
