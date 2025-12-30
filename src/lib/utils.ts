import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isTokenExpired = (token: string): boolean => {
  try {
    console.log("token exp called");
    const decoded: { exp?: number } = jwtDecode(token);
    if (!decoded.exp) return true;

    const currentTime = Date.now() / 1000; // seconds
    return decoded.exp < currentTime;
  } catch {
    return true; // invalid token
  }
};
