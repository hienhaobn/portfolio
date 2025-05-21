declare module "post-type" {
  export interface Post {
    title: string;
    description: string;
    pubDate: string;
    tags: string[];
    content: string;
  }
}
