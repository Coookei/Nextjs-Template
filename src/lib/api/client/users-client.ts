import { httpClient } from "@/lib/api";
import type { CreateUserInput } from "@/lib/validators/users";
import type { User } from "@prisma/client";
import { AxiosRequestConfig } from "axios";

const USERS_PATH = "/users";

export interface UserListResponse {
  users: User[];
}

export const usersClientApi = {
  list: async (config?: AxiosRequestConfig) => {
    const { data } = await httpClient.get<UserListResponse>(USERS_PATH, config);
    return data.users;
  },
  create: async (payload: CreateUserInput, config?: AxiosRequestConfig) => {
    const { data } = await httpClient.post<User>(USERS_PATH, payload, config);
    return data;
  },
};
