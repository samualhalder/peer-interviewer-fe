import { toast } from "@/hooks/use-toast";
import httpService from "./http.service";
import { ResponseReturnType } from "@/types/service.types";

const listNotificationService = async () => {
  try {
    const data = await httpService.get<ResponseReturnType>(
      "/notifications/list"
    );
    return data.data.result;
  } catch (error: any) {
    toast({
      variant: "destructive",
      description: error?.response?.data?.message,
    });
    return { success: false };
  }
};
const seenNotificationService = async (id: string) => {
  try {
    await httpService.put<ResponseReturnType>(`/notifications/seen/${id}`);
  } catch (error: any) {
    // toast({
    //   variant: "destructive",
    //   description: error?.response?.data?.message,
    // });
  }
};
const unseenNotificationsService = async () => {
  try {
    const res = await httpService.get<ResponseReturnType>(
      `/notifications/unseens`
    );
    return res.data.result;
  } catch (error: any) {
    // toast({
    //   variant: "destructive",
    //   description: error?.response?.data?.message,
    // });
  }
};

export {
  listNotificationService,
  seenNotificationService,
  unseenNotificationsService,
};
