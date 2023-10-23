"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@/components/elements/Button";

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    signOut();
    router.push("/login");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button theme="red" onClick={handleLogout}>
        Logout
      </Button>
    </main>
  );
}
