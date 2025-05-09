import { UserType } from "./entity.types";

export interface ChatType {
  id?: string;
  chatId: string;
  from?: string;
  to?: string;
  text: string;
  status?: string;
  createdAt: Date;
  fromUser?: UserType;
  toUser?: UserType;
}
