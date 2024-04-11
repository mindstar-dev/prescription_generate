import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import DoctorLogin from "./doctor-login";
import CompounderDashBoard from "./compounder-dashboard";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <main className="flex h-full w-full">
        <DoctorLogin />
      </main>
    </>
  );
}
