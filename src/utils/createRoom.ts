import { getInterviewIdService } from "@/services/interviewRequest.service";

export const createRoomId = async (from: string, to: string) => {
  const res = await getInterviewIdService(from, to);
  return res;
};
