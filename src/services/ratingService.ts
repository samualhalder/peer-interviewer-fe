import { toast } from "@/hooks/use-toast";
import httpService from "./http.service";
import { ResponseReturnType } from "@/types/service.types";

const giveRatingService = async (id: string, rate: number, review: string) => {
  try {
    const data = await httpService.post<ResponseReturnType>(
      `/ratings/give/${id}`,
      {
        rating: rate,
        review,
      }
    );
    toast({
      variant: "success",
      description: data.data.message,
    });
  } catch (error: any) {
    toast({
      variant: "destructive",
      description: error?.response?.data?.message,
    });
    return { success: false };
  }
};
const getRatingByIntId = async (id: string) => {
  try {
    const data = await httpService.get<ResponseReturnType>(
      `/ratings/get-by-interview/${id}`
    );
    return data.data.result;
  } catch (error: any) {
    return { rating: 0, review: "" };
  }
};
const updateRatingService = async (
  id: string,
  rating: number,
  review: string
) => {
  try {
    const data = await httpService.put<ResponseReturnType>(
      `/ratings/update/${id}`,
      {
        rating,
        review,
      }
    );
    toast({
      variant: "success",
      description: data.data.message,
    });
  } catch (error: any) {
    toast({
      variant: "destructive",
      description: error?.response?.data?.message,
    });
  }
};
const getRatingsGivenService = async () => {
  try {
    const res = await httpService.get<ResponseReturnType>(
      `/ratings/list-given`
    );
    return res.data.result;
  } catch (error: any) {
    toast({
      variant: "destructive",
      description: error?.response?.data?.message,
    });
  }
};
const getRatingsRecivedService = async () => {
  try {
    const res = await httpService.get<ResponseReturnType>(
      `/ratings/list-recived`
    );
    return res.data.result;
  } catch (error: any) {
    toast({
      variant: "destructive",
      description: error?.response?.data?.message,
    });
  }
};

export {
  giveRatingService,
  getRatingByIntId,
  updateRatingService,
  getRatingsGivenService,
  getRatingsRecivedService,
};
