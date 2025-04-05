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
  } catch (err) {
    return false;
  }
};
export { signUpService, signInService, signOutService, checkValidToken };
