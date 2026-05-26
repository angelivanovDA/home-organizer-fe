export interface PostCardProps {
  id: string;
  author: string;
  date: string;
  title: string;
  content: string;
  onStartEdit: () => void;
  onDelete: () => void;
}
