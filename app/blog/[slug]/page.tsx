import React from "react";
import { getPostBySlug } from "@/queries/post";
import { PostInfo } from "@/components/post/post-info";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlForImage } from "@/lib/image";
import { notFound } from "next/navigation";

interface BlogSlugPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogSlugPage({ params }: BlogSlugPageProps) {
  const { slug } = params;
  
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {post.coverImage && (
        <div className="mb-8 relative w-full h-[300px] rounded-lg overflow-hidden">
          <Image
            src={urlForImage(post.coverImage).url()}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <PostInfo 
        title={post.title} 
        date={post.publishedAt} 
        tags={post.tags || []} 
      />
      
      <div className="mt-8 prose prose-lg dark:prose-invert max-w-none">
        <PortableText value={post.body} />
      </div>
      
      {post.readTime && (
        <div className="mt-8 text-sm text-gray-500">
          Estimated reading time: {post.readTime} min
        </div>
      )}
    </div>
  );
}
