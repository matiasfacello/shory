import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import useCookies from "~/lib/hooks/general/useCookies";

import Navbar from "~/components/UI/Navbar";
import Footer from "~/components/UI/Footer";
import Cookies from "~/components/UI/widgets/Cookies";
import LinkAdd from "~/components/Links/Add";
import LinkList from "~/components/Links/ListForUser";
import { LinkProvider } from "~/lib/context/linkContext";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  const showCookies = useCookies();

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
          <LinkProvider>
            <LinkAdd />
            {sessionData && <LinkList />}
          </LinkProvider>
          {!showCookies.knows && <Cookies showCookies={!showCookies.knows} />}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
