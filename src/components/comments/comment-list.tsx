import { CommentWithAuthor } from '@/db/queries/comments';
import React from 'react';

import CommentShow from '@/components/comments/comment-show';

type CommentListProps = {
  fetchData: () => Promise<CommentWithAuthor[]>;
};

export default async function CommentList({
  fetchData,
}: React.PropsWithChildren<CommentListProps>) {
  const comments = await fetchData();

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        comments={comments}
      />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
