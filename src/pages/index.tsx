import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import DoctorLogin from "./doctor-login";
import CompounderDashBoard from "./compounder-dashboard";
import DoctorDashBoard from "./doctor-dashboard";
import { Session } from "node_modules/next-auth/core/types";
import { GetServerSideProps } from "next/types";

export default function Home() {
  const ses = useSession();
  if (ses.status === "loading") {
    return <div></div>;
  } else if (
    ses.status === "authenticated" &&
    ses.data.user.email === "doctor"
  ) {
    return (
      <>
        <main className="flex h-full w-full">
          <DoctorDashBoard />
        </main>
      </>
    );
  } else if (
    ses.status === "authenticated" &&
    ses.data.user.email === "compounder"
  ) {
    return (
      <>
        <main className="flex h-full w-full">
          <CompounderDashBoard />
        </main>
      </>
    );
  } else {
    return (
      <>
        <main className="flex h-full w-full">
          <DoctorLogin />
        </main>
      </>
    );
  }
}
