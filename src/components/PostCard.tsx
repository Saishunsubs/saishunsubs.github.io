import { Link } from 'react-router-dom';
import { generateSnippet } from '@/data/posts';

interface PostCardProps {
  id: string;
  title: string;
  author: string;
  date: string;
  tag: string;
  content: string;
  image: string;
  delay?: number;
}

const PostCard = ({ id, title, author, date, tag, content, image, delay = 0 }: PostCardProps) => {
  const snippet = generateSnippet(content);
  return (
    <article
      className="post-card bg-card rounded-lg overflow-hidden border border-border animate-zoom-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Link to={`/posts/${id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="post-image w-full h-full object-cover"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/posts/${id}`}>
          <h2 className="text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 mb-2">
            {title}
          </h2>
        </Link>
        
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
          <span className="font-medium">{author}</span>
          <span>•</span>
          <span>{date}</span>
          <span className="px-2 py-1 bg-primary/20 text-primary rounded text-[10px] font-semibold">
            {tag}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {snippet}
        </p>
      </div>
    </article>
  );
};

export default PostCard;
