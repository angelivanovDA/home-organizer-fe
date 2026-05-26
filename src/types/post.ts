import type { FormField } from "@/types/form";

/**
 * A post.
 * @property _id - The ID of the post.
 * @property title - The title of the post.
 * @property content - The content of the post.
 * @property imageUrl - The URL of the image.
 * @property imagePath - The path of the image.
 * @property creator - The creator of the post.
 * @property createdAt - The date and time the post was created.
 */
export interface Post {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  imagePath?: string;
  creator: { _id: string; name: string };
  createdAt: string;
}

/**
 * The data for the posts socket.
 * @property action - The action to perform.
 * @property post - The post to create or delete.
 * @property postId - The ID of the post to delete.
 */
export interface PostsSocketData {
  action: "create" | "delete";
  post?: Post;
  postId?: string;
}

/**
 * The data for the post form.
 * @property title - The title of the post.
 * @property image - The image of the post.
 * @property content - The content of the post.
 */
export interface PostFormData {
  title: string;
  image: string | File;
  content: string;
}

/**
 * A form field for the post form.
 * @property value - The value of the field.
 * @property valid - Whether the field is valid.
 * @property touched - Whether the field has been touched.
 * @property validators - The validators for the field.
 */
export interface PostFormField extends Omit<FormField, "value"> {
  value: string | File;
}

/**
 * The field names for the post form.
 * @property title - The title field.
 * @property image - The image field.
 * @property content - The content field.
 */
export type PostFormFieldName = "title" | "image" | "content";
