export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  posts: Post[];
  acquaintances: User[];
}

export interface Post {
  _id: string;
  content: string;
  author: User;
  createdAt: Date;
  //   comments: mongoose.Types.ObjectId[];
  likes: User[];
}
