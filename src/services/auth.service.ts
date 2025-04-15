import { toast } from "@/hooks/use-toast";
import httpService from "./http.service";
import TokenUtils from "@/utils/token.utils";
import { ResponseReturnType } from "@/types/service.types";

const signUpService = async (data: any) => {
  try {
    const result = await httpService.post<ResponseReturnType>(
      "/auth/signup",
      data
    );
    if (!result?.data?.error) {
      toast({
        variant: "success",
        description: result?.data?.message,
      });
    }
    return { success: true };
  } catch (error: any) {
    toast({
      variant: "destructive",
      description: error?.response?.data?.message,
    });
    return { success: false };
  }
};
const signInService = async (data: any) => {
  try {
    const result = await httpService.post<ResponseReturnType>(
      "/auth/signin",
      data
    );
    if (!result?.data?.error) {
      toast({
        variant: "success",
        description: result?.data?.message,
      });
    }
    const token = result.data.result as string;
    TokenUtils?.setToken(token);
    return { success: true };
  } catch (error: any) {
    toast({
      variant: "destructive",
      description: error?.response?.data?.message,
    });
    return { success: false };
  }
};
const oAuhtService = async (data: any) => {
  try {
    const result = await httpService.post<ResponseReturnType>(
      "/auth/oauth",
      data
    );
    if (!result?.data?.error) {
      toast({
        variant: "success",
        description: result?.data?.message,
      });
    }
    const token = result.data.result as string;
    TokenUtils?.setToken(token);
    return { success: true };
  } catch (error: any) {
    toast({
      variant: "destructive",
      description: error?.response?.data?.message,
    });
    return { success: false };
  }
};
const signOutService = () => {
  TokenUtils?.removeToken();
  toast({
    variant: "success",
    description: "Sign out successgull",
  });
};
const checkValidToken = async (token: string) => {
  try {
    const result = await httpService.post<ResponseReturnType>(
      "/auth/valid-jwt",
      { token }
    );

    return !result?.data?.result;
  } catch (err: any) {
    return false;
  }
};
const fetchUser = async () => {
  try {
    const result = await httpService.get<ResponseReturnType>(
      "/auth/get-user-by-token"
    );

    return result?.data?.result;
  } catch (err: any) {
    return null;
  }
};
const resetpasswordService = async (data: any) => {
  try {
    const result = await httpService.put<ResponseReturnType>(
      "/auth/reset-password",
      data
    );
    if (!result?.data?.error) {
      toast({
        variant: "success",
        description: result?.data?.message,
      });
    }
    const token = result.data.result as string;
    TokenUtils?.setToken(token);
    return true;
  } catch (error: any) {
    toast({
      variant: "destructive",
      description: error?.response?.data?.message,
    });
    return false;
  }
};
const getUsersService = async (search: string) => {
  try {
    const result = await httpService.get<ResponseReturnType>(
      `/auth/get-users?slug=${search}`
    );
    console.log("rs", result);

    return result?.data?.result;
  } catch (error: any) {
    toast({
      variant: "destructive",
      description: error?.response?.data?.message,
    });
    return [];
  }
};
export {
  signUpService,
  signInService,
  signOutService,
  checkValidToken,
  oAuhtService,
  fetchUser,
  resetpasswordService,
  getUsersService,
};
