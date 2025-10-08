import UserListClient from "@/components/UserListClient";
import UserListServer from "@/components/UserListServer";

export default async function Home() {
  return (
    <>
      <h1 className="font-bold text-4xl">Next.js</h1>
      <UserListServer />
      <UserListClient />
    </>
  );
}
