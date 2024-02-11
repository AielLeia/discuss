import { auth } from '@/auth';
import { Button } from '@nextui-org/react';

import Profile from '@/components/profile';

import * as actions from '@/actions';

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <form action={actions.signIn}>
        <Button type="submit">Sign In</Button>
      </form>
      <form action={actions.signOut}>
        <Button type="submit">Sign out</Button>
      </form>

      <Profile />
    </div>
  );
}
