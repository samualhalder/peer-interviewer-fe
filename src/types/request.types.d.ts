import { UserType } from "./entity.types";

export type Status = "pending" | "accepted" | "completed" | "rejected";

export interface InterviewRequestsType {
  id: string;
  from: string;
  to: string;
  status: Status;
  seen: boolean;
  createdAt: Date;
  fromuser: UserType; // Assuming User is a defined type
  touser: UserType; // Assuming User is a defined type
}
