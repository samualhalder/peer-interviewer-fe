import { UserType } from "./entity.types";
import { InterviewRequestsType } from "./request.types";

export interface RatingsType {
  id: string;
  userId: string;
  interviewId: string;
  interviewerId: string;
  rating: number;
  review?: string;
  createdAt: Date;
  User?: UserType;
  interviewer?: UserType;
  interview?: InterviewRequestsType;
}
