export interface ResponseReturnType {
  error: boolean;
  message: string;
  result: any; // Replace 'any' with the appropriate type based on your backend API
}
export type LooseObject = {
  [key: string]: unknown;
};
