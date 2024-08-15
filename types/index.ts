import type { Conversation, Message, User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string,
  updatedAt: string,
  emailVerified: string | null,
}

export type FullMessageType = Message & {
  sender: User,
  seen: User[]
}

export type FullConversationType = Conversation & {
  users: User[],
  messages: FullMessageType[]
}

// API RESPONSE INTERFACE
export enum ResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface ResponseType {
  status: ResponseStatus,
  message?: string,
  data?: any
}

export enum ConversationExistingType {
  EXISTED = 'EXISTED',
  NEW = 'NEW',
}