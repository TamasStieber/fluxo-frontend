export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  profilePictureUrl: string;
  posts: Post[];
  acquaintances: User[];
}

export interface Post {
  _id: string;
  content: string;
  author: User;
  createdAt: Date;
  contentUpdated: Date;
  updatedAt: Date;
  //   comments: mongoose.Types.ObjectId[];
  likes: User[];
}

export interface Message {
  _id: string;
  sender: string;
  receiver: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
}
