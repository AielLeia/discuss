import type { PostWithTopicAndUserAndCount } from '@/db/queries/posts';
import paths from '@/paths';
import Link from 'next/link';
import React from 'react';

type PostListProps = {
  fetchData: () => Promise<PostWithTopicAndUserAndCount[]>;
};

export default async function PostList({
  fetchData,
}: React.PropsWithChildren<PostListProps>) {
  const posts = await fetchData();

  const renderedPosts = posts.map((post) => {
    const topicSlug = post.topic.slug;

    if (!topicSlug) {
      throw new Error('Need a slug to link to a post');
    }

    return (
      <div key={post.id} className="border rounded p-2">
        <Link href={paths.postShow({ slug: topicSlug, postId: post.id })}>
          <h3 className="text-lg font-bold">{post.title}</h3>
          <div className="flex flex-row gap-8">
            <p className="text-xs text-gray-400">By {post.user.name}</p>
            <p className="text-xs text-gray-400">
              {post._count.comments} comments
            </p>
          </div>
        </Link>
      </div>
    );
  });

  return <div className="space-y-2">{renderedPosts}</div>;
}