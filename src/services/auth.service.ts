import { toast } from "@/hooks/use-toast";
import httpService from "./http.service";
import TokenUtils from "@/utils/token.utils";

const signUpService = async (data) => {
  try {
    const result = await httpService.post("/auth/signup", data);
    if (!result?.data?.error) {
      toast({
        variant: "success",
        description: result?.data?.message,
      });
    }
    return { success: true };
  } catch (error) {
    toast({
      variant: "destructive",
      description: error?.response?.data?.message,
    });
    return { success: false };
  }
};
const signInService = async (data) => {
  try {
    const result = await httpService.post("/auth/signin", data);
    if (!result?.data?.error) {
      toast({
        variant: "success",
        description: result?.data?.message,
      });
    }
    TokenUtils.setToken(result.data.result);
    return { success: true };
  } catch (error) {
    toast({
      variant: "destructive",
      description: error?.response?.data?.message,
    });
    return { success: false };
  }
};

export { signUpService, signInService };
