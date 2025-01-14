import { TPost } from "src/types";

export const getAllTags = (posts: TPost[] = []) => {
  const tagCounts: { [key: string]: number } = {};
  
  posts.forEach(post => {
    post.tags?.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return tagCounts;
}; 