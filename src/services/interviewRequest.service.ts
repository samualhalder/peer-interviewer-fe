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
const list = async (order: string, status: string) => {
  try {
    const result = await httpService.get<ResponseReturnType>(
      `/interview-requests/list?order=${order}&status=${status}`
    );

    return result.data.result;
  } catch (error: any) {
    return [];
  }
};
const listSent = async (order: string, status: string) => {
  try {
    const result = await httpService.get<ResponseReturnType>(
      `/interview-requests/list-sent?order=${order}&status=${status}`
    );

    return result.data.result;
  } catch (error: any) {
    return [];
  }
};
const acceptService = async (id: string) => {
  try {
    const result = await httpService.put<ResponseReturnType>(
      `/interview-requests/accept/${id}`
    );
    toast({
      variant: "success",
      description: result.data.message,
    });
    return result.data.result;
  } catch (error: any) {
    toast({
      variant: "destructive",
      description: error?.response?.data?.message,
    });
    return false;
  }
};
const rejectService = async (id: string) => {
  try {
    const result = await httpService.put<ResponseReturnType>(
      `/interview-requests/reject/${id}`
    );
    toast({
      variant: "success",
      description: result.data.message,
    });
    return result.data.result;
  } catch (error: any) {
    toast({
      variant: "destructive",
      description: error?.response?.data?.message,
    });
    return false;
  }
};

const checkNewRequests = async () => {
  try {
    const result = await httpService.get<ResponseReturnType>(
      `/interview-requests/is-new-requests`
    );
    return result.data.result;
  } catch (error) {
    return 0;
  }
};
const isAccepted = async (id: string) => {
  try {
    const result = await httpService.get<ResponseReturnType>(
      `/interview-requests/is-accepted/${id}`
    );
    // TODO: return the id or null based on result
    if (result.data.result.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
const canChatService = async (id: string) => {
  try {
    const result = await httpService.get<ResponseReturnType>(
      `/interview-requests/can-chat/${id}`
    );
    return result.data.result;
  } catch (error) {
    return false;
  }
};
const intStatsService = async (id: string) => {
  try {
    const result = await httpService.get<ResponseReturnType>(
      `/interview-requests/int-stats/${id}`
    );
    console.log("res", id, result);

    return result.data.result;
  } catch (error) {
    return false;
  }
};
const getInterviewIdService = async (from: string, to: string) => {
  try {
    const result = await httpService.get<ResponseReturnType>(
      `/interview-requests/get-int-id?from=${from}&to=${to}`
    );

    return result.data.result;
  } catch (error) {
    return false;
  }
};
const endInterviewService = async (id: string) => {
  console.log("end in called", id);

  try {
    const result = await httpService.put<ResponseReturnType>(
      `/interview-requests/end/${id}`
    );
    toast({
      variant: "success",
      description: result.data.message,
    });
    return true;
  } catch (error) {
    return false;
  }
};
export {
  isSentService,
  sendService,
  unsendService,
  list,
  listSent,
  acceptService,
  rejectService,
  checkNewRequests,
  isAccepted,
  canChatService,
  intStatsService,
  getInterviewIdService,
  endInterviewService,
};
