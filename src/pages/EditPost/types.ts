import type { Post, PostFormData } from "@/types";

export interface EditPostFormValues {
  title: string;
  content: string;
}

export interface EditPostProps {
  editing: boolean;
  selectedPost: Post | null;
  loading: boolean;
  onCancelEdit: () => void;
  onFinishEdit: (post: PostFormData) => void;
}
