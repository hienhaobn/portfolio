declare module "post-type" {
  export interface Post {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
    publishedAt: string;
    description?: string;
    body: {
      _key: string;
      _type: string;
      children: {
        _key: string;
        _type: string;
        text: string;
        marks: string[];
      }[];
      markDefs: {
        _key: string;
        _type: string;
        href?: string;
      }[];
      style: string;
    }[];
    tags?: string[];
    coverImage?: {
      _type: 'image';
      asset: {
        _ref: string;
        _type: 'reference';
      };
    };
    readTime?: number;
    isFeatured?: boolean;
    visibility?: 'public' | 'private' | 'unlisted';
    seo?: {
      seoTitle?: string;
      seoDescription?: string;
      seoImage?: {
        _type: 'image';
        asset: {
          _ref: string;
          _type: 'reference';
        };
      };
    };
  }
}
