import type { NextPage } from "next";
import Head from "next/head";

import Navbar from "../components/UI/Navbar";
import LinkAdd from "../components/Links/Add";
import LinkList from "../components/Links/ListForUser";
import { LinkProvider } from "../lib/context/linkContext";

const Home: NextPage = () => {
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
            <LinkList />
          </LinkProvider>
        </div>
      </main>
    </>
  );
};

export default Home;
