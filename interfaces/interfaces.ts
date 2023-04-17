export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  userName: string;
  email: string;
  createdAt: Date;
  profilePictureUrl: string;
  friendRequests: string[];
  photosFolder: string;
  lastReadMessages: LastReadMessage[];
  posts: Post[];
  likedPosts: Post[];
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

export interface Conversation {
  _id: string;
  participants: User[];
  messages: Message[];
  lastMessage: Message;
}

export interface LastReadMessage {
  conversation: string;
  lastReadMessage: string;
}

export interface PostFormData {
  author: string;
  content: string;
}

export interface FriendRequest {
  _id: string;
  sender: User;
  receiver: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}
