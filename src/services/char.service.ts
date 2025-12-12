import { toast } from "@/hooks/use-toast";
import httpService from "./http.service";
import { ResponseReturnType } from "@/types/service.types";

const sendChatService = async (data: any) => {
  try {
    await httpService.post<ResponseReturnType>("/chats/send", data);
    return { success: true };
  } catch (error: any) {
    toast({
      variant: "destructive",
      description: error?.response?.data?.message || "Something Went Wrong",
    });
    return { success: false };
  }
};
const listChatService = async (id: string) => {
  try {
    const data = await httpService.get<ResponseReturnType>(`/chats/list/${id}`);
    return data.data.result;
  } catch (error: any) {
    toast({
      variant: "destructive",
      description: error?.response?.data?.message || "Something Went Wrong",
    });
    return { success: false };
  }
};

export { sendChatService, listChatService };
