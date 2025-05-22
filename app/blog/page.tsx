import { PostView } from "@/components/post/post-view";
import POSTS from "@/data/posts";

export default function Blog() {
  return (
    <div>
      <h1 className="font-heading mb-8 text-2xl sm:text-4xl">Blog</h1>
      <div className="w700:grid-cols-1 grid grid-cols-2 gap-5">
        {POSTS.map((post) => (
          <PostView
            key={post.title}
            url={`/blog/${post.title}`}
            title={post.title}
            description={post.description}
            pubDate={post.pubDate}
          />
        ))}
      </div>
    </div>
  );
}
