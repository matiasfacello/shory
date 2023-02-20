import type { NextPage } from "next";
import Router from "next/router";
import { useSession } from "next-auth/react";
import Head from "next/head";

import Navbar from "~/components/UI/Navbar";
import ChangeUsername from "~/components/User/ChangeUsername";
import DeleteUser from "~/components/User/DeteleUser";

const Settings: NextPage = () => {
  useSession({
    required: true,
    onUnauthenticated() {
      Router.push("/");
    },
  });

  return (
    <>
      <Head>
        <title>Shory</title>
        <meta name="description" content="Shory - Create your short links and track them!" />
        <link rel="icon" href="/img/logo.svg" />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-slate-800">
        <div className="container m-auto px-4 py-16">
          <ChangeUsername />
          <DeleteUser />
        </div>
      </main>
    </>
  );
};

export default Settings;
