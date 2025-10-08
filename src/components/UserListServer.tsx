import { usersApi } from "@/lib/api";

const UserListServer = async () => {
  const users = await usersApi.list(); // example using server API to load users

  return (
    <div>
      <p>Users loaded on server:</p>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserListServer;
