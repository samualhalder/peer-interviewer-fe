import { ResponseReturnType } from "@/types/service.types";
import httpService from "./http.service";
import { toast } from "@/hooks/use-toast";

const sendService = async (data: any) => {
  try {
    const result = await httpService.post<ResponseReturnType>(
      "/interview-requests/sent",
      data
    );
    if (!result?.data?.error) {
      toast({
        variant: "success",
        description: result?.data?.message,
      });
    }

    return result.data.result;
  } catch (error: any) {
    toast({
      variant: "destructive",
      description: error?.response?.data?.message,
    });
    return data;
  }
};
const unsendService = async (data: any) => {
  try {
    const result = await httpService.post<ResponseReturnType>(
      "/interview-requests/unsend",
      data
    );
    if (!result?.data?.error) {
      toast({
        variant: "success",
        description: result?.data?.message,
      });
    }

    return result.data.result;
  } catch (error: any) {
    toast({
      variant: "destructive",
      description: error?.response?.data?.message,
    });
    return data;
  }
};
const isSentService = async (id: string) => {
  try {
    const result = await httpService.get<ResponseReturnType>(
      `/interview-requests/issend/${id}`
    );

    return result.data.result;
  } catch (error: any) {
    toast({
      variant: "destructive",
      description: error?.response?.data?.message,
    });
    return false;
  }
};

export { isSentService, sendService, unsendService };
