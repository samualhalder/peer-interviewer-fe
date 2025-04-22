export interface UserType {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
  description?: string;
  image?: string;
  organization?: string;
  location?: string;
  skills?: string;
  noOfFollowers: number;
  noOfFollowings: number;
  isAccountDeleted?: boolean;
  createdAt?: Date;
}
