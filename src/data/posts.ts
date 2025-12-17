export interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
  tag: string;
  image: string;
  content: string;
}

// Helper function to generate snippet from content
export const generateSnippet = (content: string, maxLength: number = 150): string => {
  // Remove HTML tags
  const plainText = content.replace(/<[^>]*>/g, '');
  // Trim and truncate
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + '...';
};

// Helper function to get post snippet
export const getPostSnippet = (post: Post): string => {
  return generateSnippet(post.content);
};

// Posts organized by month - December 2025
export const posts_2025_12: Post[] = [
  // Posts will be added here
];

// Posts organized by month - November 2025
export const posts_2025_11: Post[] = [
  // Posts will be added here
];

// Combine all posts and sort by date (newest first)
export const getAllPosts = (): Post[] => {
  const allPosts = [
    ...posts_2025_12,
    ...posts_2025_11,
  ];
  
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Get latest N posts
export const getLatestPosts = (count: number = 6): Post[] => {
  return getAllPosts().slice(0, count);
};

// For backward compatibility
export const posts: Post[] = [];
