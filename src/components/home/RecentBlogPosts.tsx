"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/button/button-link";
import { getAllPosts } from "@/queries/post";
import { Post } from "post-type";
import { useRouter } from "next/navigation";
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function RecentBlogPosts() {
  const router = useRouter();
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);

  // Load recent posts
  useEffect(() => {
    async function loadRecentPosts() {
      try {
        const posts = await getAllPosts();
        setRecentPosts(posts.slice(0, 2)); // Get 2 most recent posts
      } catch (error) {
        console.error('Failed to load recent posts:', error);
        setRecentPosts([]); // Fallback to empty array
      } finally {
        setPostsLoading(false);
      }
    }
    
    loadRecentPosts();
  }, []);

  return (
    <motion.div
      variants={itemVariants}
      initial={{
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
      whileHover={{
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        y: -5,
      }}
      className="bg-primary/5 backdrop-blur-sm rounded-lg p-5 border border-primary/20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-30" />
      <div className="relative z-10">
        <p className="font-semibold text-xl mb-3">Latest Blog Posts</p>
        
        {postsLoading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-md animate-pulse">
                <div className="w-6 h-6 bg-primary/20 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-primary/20 rounded mb-2"></div>
                  <div className="h-3 bg-primary/10 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.ul
            className="space-y-3"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <motion.li
                  key={post._id}
                  variants={itemVariants}
                  whileHover={{
                    backgroundColor: "rgba(var(--primary-rgb), 0.15)",
                    x: 5,
                  }}
                  className="flex items-center gap-3 p-3 rounded-md transition-colors border border-transparent hover:border-primary/20 cursor-pointer"
                  onClick={() => router.push(`/blog/${post.slug.current}`)}
                >
                  <div className="text-xl">📝</div>
                  <div>
                    <div className="font-medium text-primary">{post.title}</div>
                    <div className="text-sm opacity-80">
                      {post.description || "Click to read more..."}
                    </div>
                  </div>
                </motion.li>
              ))
            ) : (
              <div className="text-center py-4 text-sm opacity-60">
                No recent posts available
              </div>
            )}
          </motion.ul>
        )}
        
        <div className="mt-5 flex justify-end">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <ButtonLink
              href="/blog"
              target="_self"
              className="text-xs px-3 py-1 relative overflow-hidden group"
            >
              <span className="relative z-10">Read all posts</span>
              <motion.span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity" />
              <span className="ml-1 relative group-hover:translate-x-1 transition-transform inline-block">
                →
              </span>
            </ButtonLink>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
