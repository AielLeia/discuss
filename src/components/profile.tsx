'use client';

import { useSession } from 'next-auth/react';

export default function Profile() {
  const session = useSession();

  return (
    <div>
      {' '}
      {session.data?.user && (
        <pre>{JSON.stringify(session.data.user, null, 2)}</pre>
      )}
    </div>
  );
}
