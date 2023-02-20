import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { env } from "../env/server.mjs";

import Head from "next/head.js";
import Image from "next/image";

interface Context {
  params: {
    slug: string;
  };
}

interface DataProps {
  data: {
    status: string;
    url: string;
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: "*" } }],
    fallback: true,
  };
}

export const getStaticProps = async (context: Context) => {
  const dir = env.NEXTAUTH_URL + "/api/link/" + context.params.slug;
  const res = await fetch(dir);
  const link = await res.json();

  if (link.status == "error") {
    const data = {
      status: "error",
      url: "/",
    };
    return {
      props: {
        data,
      },
    };
  }

  const linkSource = link.utm_source ? "&utm_source=" + link.utm_source : "";
  const linkCampaign = link.utm_campaign ? "&utm_campaign=" + link.utm_campaign : "";
  const linkMedium = link.utm_medium ? "&utm_medium=" + link.utm_medium : "";
  const linkTerm = link.utm_term ? "&utm_term=" + link.utm_term : "";
  const linkContent = link.utm_content ? "&utm_content=" + link.utm_content : "";
  const goTo = link.url + "/?" + linkSource + linkCampaign + linkMedium + linkTerm + linkContent;

  const data = {
    status: "success",
    url: goTo,
  };
  return {
    props: {
      data,
    },
  };
};

const Link: NextPage<DataProps> = ({ data }) => {
  const router = useRouter();

  useEffect(() => {
    if (data?.status === "success") {
      router.push(data.url);
    } else if (data?.status === "error") {
      router.push(data.url);
    }
  }, [router, data]);

  return (
    <>
      <Head>
        <title>Redirecting - Shory</title>
        <meta name="description" content="Shory - Create your short links and track them!" />
        <link rel="icon" href="/img/logo.svg" />
      </Head>
      <div className="min-w-screen flex min-h-screen flex-col items-center justify-center bg-slate-900">
        <Image src="/img/puff.svg" alt="Loading" width={50} height={50} />
        <h2 className="m-8 block text-2xl text-white">Redirecting</h2>
      </div>
    </>
  );
};

export default Link;
