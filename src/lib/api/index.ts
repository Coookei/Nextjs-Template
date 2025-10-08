export { default as httpClient } from "./client/http"; // raw axios instance

export { usersApi } from "./server/users"; // users api for server components that use prisma directly
export { usersClientApi } from "./client/users-client"; // user api for client components that use axios
