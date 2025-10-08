import { httpClient } from "@/lib/api";
import type { CreateUserInput } from "@/lib/validators/users";
import type { User } from "@prisma/client";

const USERS_PATH = "/users";

export interface UserListResponse {
  users: User[];
}

export const usersClientApi = {
  list: async () => {
    const { data } = await httpClient.get<UserListResponse>(USERS_PATH);
    return data.users;
  },
  create: async (payload: CreateUserInput) => {
    const user = await httpClient.post<User, CreateUserInput>(
      USERS_PATH,
      payload,
    );
    return user;
  },
};
