import { Metadata } from 'next';
import { Post } from 'post-type';
import { urlForImage } from './image';

interface SEOConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  author?: string;
}

const DEFAULT_SEO = {
  siteName: 'Joy Dev',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-hienhaobns-projects.vercel.app',
  defaultTitle: 'Joy Dev - Frontend Developer & Tech Enthusiast',
  defaultDescription: 'Personal portfolio and blog of Joy Dev, a passionate frontend developer sharing insights about web development, React, Next.js, and modern technologies.',
  defaultImage: '/og-image.jpg', // You'll need to add this image to your public folder
  twitterHandle: '@joydev9x',
  author: 'Joy Dev',
};

export function generateSEOMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    image,
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    tags,
    author = DEFAULT_SEO.author,
  } = config;

  const fullTitle = title === DEFAULT_SEO.defaultTitle ? title : `${title} | ${DEFAULT_SEO.siteName}`;
  const fullUrl = url ? `${DEFAULT_SEO.siteUrl}${url}` : DEFAULT_SEO.siteUrl;
  const imageUrl = image || DEFAULT_SEO.defaultImage;
  const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${DEFAULT_SEO.siteUrl}${imageUrl}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    authors: [{ name: author }],
    creator: author,
    publisher: DEFAULT_SEO.siteName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: DEFAULT_SEO.siteName,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [fullImageUrl],
      creator: DEFAULT_SEO.twitterHandle,
      site: DEFAULT_SEO.twitterHandle,
    },
    alternates: {
      canonical: fullUrl,
    },
  };

  // Add article-specific metadata
  if (type === 'article' && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime: modifiedTime || publishedTime,
      authors: [author],
      tags,
    };
  }

  return metadata;
}

export function generatePostMetadata(post: Post): Metadata {
  const seoTitle = post.seo?.seoTitle || post.title;
  const seoDescription = post.seo?.seoDescription || post.description || `Read "${post.title}" on Joy Dev's blog`;

  let seoImage = DEFAULT_SEO.defaultImage;
  if (post.seo?.seoImage) {
    seoImage = urlForImage(post.seo.seoImage).width(1200).height(630).url();
  } else if (post.coverImage) {
    seoImage = urlForImage(post.coverImage).width(1200).height(630).url();
  }

  return generateSEOMetadata({
    title: seoTitle,
    description: seoDescription,
    image: seoImage,
    url: `/blog/${post.slug.current}`,
    type: 'article',
    publishedTime: post.publishedAt,
    tags: post.tags,
  });
}

export function generateStructuredData(post: Post) {
  const seoImage = post.seo?.seoImage || post.coverImage;
  const imageUrl = seoImage
    ? urlForImage(seoImage).width(1200).height(630).url()
    : `${DEFAULT_SEO.siteUrl}${DEFAULT_SEO.defaultImage}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.seo?.seoTitle || post.title,
    description: post.seo?.seoDescription || post.description,
    image: imageUrl,
    author: {
      '@type': 'Person',
      name: DEFAULT_SEO.author,
      url: DEFAULT_SEO.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: DEFAULT_SEO.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${DEFAULT_SEO.siteUrl}/logo.png`, // You'll need to add this
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt, // You might want to add a modifiedAt field to your schema
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${DEFAULT_SEO.siteUrl}/blog/${post.slug.current}`,
    },
    keywords: post.tags?.join(', '),
    articleSection: 'Technology',
    inLanguage: 'en-US',
    url: `${DEFAULT_SEO.siteUrl}/blog/${post.slug.current}`,
  };
}
