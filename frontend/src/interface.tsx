import { ChangeEvent } from "react";

export interface AppbarProps {
  fn?: () => void;
}

export interface Blog {
  id: string;
  author: { name: string | undefined };
  title: string;
  topic: string | undefined;
  content: string;
  publishedDate: Date;
}

export interface InputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export interface BlogCardProps {
  id: string;
  isUser?: boolean;
  topic?: string;
  authorName?: string;
  title: string;
  content: string;
  refetch?: () => void;
  publishedDate: Date;
}

export interface BlogType {
  content: string;
  title: string;
  topic: string;
  id: string;
  likes: string[];
  publishedDate: Date;
  author: {
    name: string;
  };
  posts: {
    id: string;
    title: string;
    content: string;
    topic: string;
  }[];
}

export interface UserType {
  id: string;
  title: string;
  content: string;
  topic: string;
  publishedDate: Date;
}
