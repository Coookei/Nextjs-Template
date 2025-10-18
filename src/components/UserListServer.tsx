import { usersApi } from "@/lib/api";
import { User } from "@prisma/client";

const UserListServer = async () => {
  // example component using server API to load users
  let users: User[] = [];
  try {
    users = await usersApi.list();
  } catch (e) {
    const error = e instanceof Error ? e.message : "Unknown error";
    return (
      <div role="alert" className="text-red-700">
        Failed to load users on server: {error}
      </div>
    );
  }

  if (!users.length) return <div>No users found.</div>;

  return (
    <div>
      <p>Users loaded on server:</p>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name ?? u.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserListServer;
