import type { NextPage } from "next";
import Head from "next/head";
import CookieSelector from "~/components/UI/CookieSelector";

import Navbar from "~/components/UI/Navbar";

const Settings: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cookies - Shory</title>
        <meta name="description" content="Shory - Create your short links and track them!" />
        <link rel="icon" href="/img/logo.svg" />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-slate-800">
        <div className="container m-auto px-4 py-16">
          <CookieSelector />
        </div>
      </main>
    </>
  );
};

export default Settings;