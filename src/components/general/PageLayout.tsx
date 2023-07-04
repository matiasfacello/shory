import Footer from "~/components/UI/Footer";
import Navbar from "~/components/UI/Navbar";
import Head from "next/head";
import type { PropsWithChildren } from "react";

const PageLayout = (props: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>Shory</title>
        <meta name="description" content="Shory - Create your short links and track them!" />
        <link rel="icon" href="/img/logo.svg" />
      </Head>
      <Navbar />
      <main className="min-h-screen bg-slate-800">{props.children}</main>
      <Footer />
    </>
  );
};

export default PageLayout;
