import React from "react";
import { PostInfo } from "@/components/post/post-info";
import { urlForImage } from "@/lib/image";
import { generatePostMetadata, generateStructuredData } from "@/lib/seo";
import { getPostBySlug, getRecentPostSlugs } from "@/queries/post";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

interface BlogSlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Best Practice: ISR for dynamic content updates
export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  if (process.env.NODE_ENV === "development") {
    return [];
  }

  try {
    const recentPosts = await getRecentPostSlugs(30); // 30 most recent

    // Optional: Add featured posts if you have them
    // const featuredPosts = await getFeaturedPostSlugs();
    // const uniqueFeatured = featuredPosts.filter(featured =>
    //   !recentPosts.some(recent => recent.slug === featured.slug)
    // );
    // return [...recentPosts, ...uniqueFeatured];

    return recentPosts;
  } catch (error) {
    // Fallback: If data fetching fails, generate no static pages
    console.warn("Failed to generate static params:", error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Joy Dev",
      description: "The requested blog post could not be found.",
    };
  }

  return generatePostMetadata(post);
}

export default async function BlogSlugPage({ params }: BlogSlugPageProps) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const structuredData = generateStructuredData(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

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
    </>
  );
}
