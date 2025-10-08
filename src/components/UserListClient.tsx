"use client";

import { usersClientApi } from "@/lib/api";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

const UserListClient = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      try {
        const users = await usersClientApi.list(); // example using client API to load users
        if (isMounted) setUsers(users);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Unknown error";
        if (isMounted) setError(message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div>Loading users…</div>;
  if (error)
    return (
      <div role="alert" style={{ color: "#c00" }}>
        Failed to load users: {error}
      </div>
    );

  if (!users.length) return <div>No users found.</div>;

  return (
    <div>
      <p>Users loaded on client:</p>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserListClient;
