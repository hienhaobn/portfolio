import { PostView } from "@/components/post/post-view";
import { getAllPosts } from "@/queries/post";

export default async function Blog() {
  const posts = await getAllPosts();

  return (
    <div>
      <h1 className="font-heading mb-8 text-2xl sm:text-4xl">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
        {posts.map((post) => (
          <div key={post._id} className="h-full">
            <PostView
              url={`/blog/${post.slug.current}`}
              post={post}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
