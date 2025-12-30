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
    const token = result.data.result;
    TokenUtils?.setToken(token);
    httpService.setJWT(token);
    return { success: true };
  } catch (error: any) {
    toast({
      variant: "destructive",
      description: error?.response?.data?.message || "Something Went Wrong",
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
    httpService.setJWT(token);
    return { success: true };
  } catch (error: any) {
    toast({
      variant: "destructive",
      description: error?.response?.data?.message || "Something Went Wrong",
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
    httpService.setJWT(token);
    return { success: true };
  } catch (error: any) {
    toast({
      variant: "destructive",
      description: error?.response?.data?.message || "Something Went Wrong",
    });
    return { success: false };
  }
};
const signOutService = () => {
  TokenUtils?.removeToken();
  httpService.setJWT("");
  
  toast({
    variant: "success",
    description: "Sign out successgull",
  });
};
const checkValidToken = async (token?: string) => {
  try {
    const result = await httpService.post<ResponseReturnType>(
      "/auth/valid-jwt",
      { token }
    );

    return !result?.data?.result;
  } catch (err: any) {
    console.log(err);

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
    console.log(err);
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
      description: error?.response?.data?.message || "Something Went Wrong",
    });
    return false;
  }
};
const getUsersService = async (search: string) => {
  try {
    const result = await httpService.get<ResponseReturnType>(
      `/auth/get-users?slug=${search}`
    );

    return result?.data?.result;
  } catch (error: any) {
    toast({
      variant: "destructive",
      description: error?.response?.data?.message || "Something Went Wrong",
    });
    return [];
  }
};
const getUsersByIdService = async (id: string) => {
  try {
    const result = await httpService.get<ResponseReturnType>(
      `/auth/get-user/${id}`
    );
    return result?.data?.result;
  } catch (error: any) {
    console.log(error);

    return {};
  }
};
const isPasswordSetService = async () => {
  try {
    const result = await httpService.get<ResponseReturnType>(
      `/auth/is-password-set`
    );
    return result?.data?.result;
  } catch (error: any) {
    console.log(error);

    return {};
  }
};

const forgotPassword = async (data: { email: string }) => {
  try {
    const result = await httpService.post<ResponseReturnType>(
      "/auth/forgot-password",
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
      description: error?.response?.data?.message || "Something Went Wrong",
    });
    return false;
  }
};

const validateResetPasswordTokenService = async (token: string) => {
  try {
    await httpService.get<ResponseReturnType>(
      `/auth/validate-token?token=${token}`
    );

    return true;
  } catch (error: any) {
    console.log(error);
    return false;
  }
};

const resetForgotPasswordService = async (data: {
  token: string;
  password: string;
}) => {
  try {
    const result = await httpService.post<ResponseReturnType>(
      "/auth/reset-forgot-password",
      data
    );
    if (!result?.data?.error) {
      toast({
        variant: "success",
        description: result?.data?.message,
      });
    }
    return true;
  } catch (error: any) {
    toast({
      variant: "destructive",
      description: error?.response?.data?.message || "Something Went Wrong",
    });
    return false;
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
  getUsersByIdService,
  isPasswordSetService,
  forgotPassword,
  validateResetPasswordTokenService,
  resetForgotPasswordService,
};
