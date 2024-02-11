'use client';

import { NextUIProvider } from '@nextui-org/react';
import React from 'react';

type ProvidersProps = {};

export default function Providers({
  children,
}: React.PropsWithChildren<ProvidersProps>) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
