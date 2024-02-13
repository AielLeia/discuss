import { searchPosts } from '@/db/queries/posts';
import paths from '@/paths';
import { redirect } from 'next/navigation';

import PostList from '@/components/posts/post-list';

type SearchPageProps = {
  searchParams: {
    term: string;
  };
};

export default async function SearchPage({
  searchParams: { term },
}: SearchPageProps) {
  if (!term) {
    redirect(paths.home());
  }

  return (
    <div>
      <PostList fetchData={() => searchPosts(term)} />
    </div>
  );
}
