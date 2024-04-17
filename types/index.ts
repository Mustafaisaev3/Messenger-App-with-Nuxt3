import { User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string,
  updatedAt: string,
  emailVerified: string | null,
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