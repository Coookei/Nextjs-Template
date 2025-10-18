import UserListServer from "@/components/UserListServer";
import UserListClient from "@/components/UserListClient";

export default async function Home() {
  return (
    <>
      <h1 className="font-bold text-4xl">Next.js Template</h1>
      <UserListServer />
      <UserListClient />
    </>
  );
}
