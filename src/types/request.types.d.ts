import { UserType } from "./entity.types";

export interface InterviewRequestsType {
  id: string;
  from: string;
  to: string;
  status: string;
  seen: boolean;
  createdAt: Date;
  fromuser: UserType; // Assuming User is a defined type
  touser: UserType; // Assuming User is a defined type
}
