import { ResponseReturnType } from "@/types/service.types";
import httpService from "./http.service";
import { toast } from "@/hooks/use-toast";

const leftProfileFormService = async (data: any) => {
  try {
    const result = await httpService.put<ResponseReturnType>(
      "/auth/update",
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

export { leftProfileFormService };
