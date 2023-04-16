import { Conversation } from '@/interfaces/interfaces';
import { createContext } from 'react';

type ConversationsContextProps = {
  conversations: Conversation[];
  isLoading: boolean;
  error: Error | null;
  refreshConversations: () => void;
};

const contextInitializer = {
  conversations: [],
  isLoading: true,
  error: null,
  refreshConversations: () => {},
};

export const ConversationsContext =
  createContext<ConversationsContextProps>(contextInitializer);
