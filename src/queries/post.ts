import { Post } from "post-type";
import { sanity } from "../lib/sanity";

export async function getAllPosts(): Promise<Post[]> {
  return await sanity.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, publishedAt, description, body
  }`);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return await sanity.fetch(
    `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      description,
      body,
      tags,
      coverImage,
      readTime,
      isFeatured,
      visibility,
      seo
    }`,
    { slug }
  );
}

export async function getPostByCategory(category: string) {
  return await sanity.fetch(
    `
    *[_type == "post" && category == $category] | order(publishedAt desc) {
    _id, title, slug, publishedAt, description, body
  }`,
    { category }
  );
}

// Optimized query for static generation (only gets slug and metadata)
export async function getPostSlugsForStaticGeneration(): Promise<{ slug: string; isFeatured?: boolean }[]> {
  return await sanity.fetch(`
    *[_type == "post" && visibility == "public"] | order(publishedAt desc) {
      "slug": slug.current,
      isFeatured
    }
  `);
}

// Get recent posts for static generation
export async function getRecentPostSlugs(limit: number = 50): Promise<{ slug: string }[]> {
  return await sanity.fetch(
    `
    *[_type == "post" && visibility == "public"] | order(publishedAt desc)[0...$limit] {
      "slug": slug.current
    }`,
    { limit: limit - 1 } // GROQ uses 0-based indexing
  );
}
