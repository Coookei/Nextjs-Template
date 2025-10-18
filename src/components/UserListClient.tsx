"use client";

import { usersClientApi } from "@/lib/api";
import { User } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

const UserListClient = () => {
  // example component using client API to load users
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // use a controller so if the component unmounts, the request is cancelled
    const controller = new AbortController();

    const loadUsers = async () => {
      try {
        const users = await usersClientApi.list({ signal: controller.signal });
        setUsers(users);
      } catch (e) {
        if (axios.isCancel?.(e) || controller.signal.aborted) return;
        const message = e instanceof Error ? e.message : "Unknown error";
        setError(message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    loadUsers();
    return () => controller.abort();
  }, []);

  if (loading) return <div>Loading users…</div>;

  if (error)
    return (
      <div role="alert" className="text-red-700">
        Failed to load users on client: {error}
      </div>
    );

  if (!users.length) return <div>No users found.</div>;

  return (
    <div>
      <p>Users loaded on client:</p>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name ?? u.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserListClient;
