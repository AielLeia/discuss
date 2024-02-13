const paths = {
  home() {
    return '/';
  },
  topicShow({ slug }: { slug: string }) {
    return `/topics/${slug}`;
  },
  postCreate({ slug }: { slug: string }) {
    return `/topics/${slug}/posts/new`;
  },
  postShow({ slug, postId }: { slug: string; postId: string }) {
    return `/topics/${slug}/posts/${postId}`;
  },
};

export default paths;
