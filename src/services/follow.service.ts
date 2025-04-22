import { ResponseReturnType } from "@/types/service.types";
import httpService from "./http.service";
import { toast } from "@/hooks/use-toast";

const followService = async (data: any) => {
  try {
    const result = await httpService.post<ResponseReturnType>(
      "/followers/follow",
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
const unFollowService = async (data: any) => {
  try {
    const result = await httpService.post<ResponseReturnType>(
      "/followers/unfollow",
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
const isFollowingService = async (id: string) => {
  try {
    const result = await httpService.get<ResponseReturnType>(
      `/followers/isfollowing/${id}`
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

export { followService, unFollowService, isFollowingService };
