import type { NextPage, GetServerSidePropsContext } from "next";
import requestIp from "request-ip";
import geoip from "geoip-lite";

import Head from "next/head.js";
import Image from "next/image";
import { prisma } from "~/server/db";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  if (!context.params)
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };

  const link = await prisma.sLink.findFirst({
    where: {
      slug: {
        equals: context.params.slug as string,
      },
    },
    select: {
      id: true,
      url: true,
      slug: true,
      utm_campaign: true,
      utm_content: true,
      utm_medium: true,
      utm_source: true,
      utm_term: true,
    },
  });

  if (!link)
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };

  const detectedIp = requestIp.getClientIp(context.req) || "::ffff:127.0.0.1";
  const geoIp = detectedIp == "::ffff:127.0.0.1" ? geoip.lookup("190.227.13.2") : geoip.lookup(detectedIp);
  const saveIp = JSON.stringify(geoIp);

  await prisma.sLinkClicks.create({
    data: {
      slug: link.slug,
      url: link.url,
      linkId: link.id,
      ip: detectedIp,
      geo: saveIp,
    },
  });

  const linkSource = link.utm_source ? "&utm_source=" + link.utm_source : "";
  const linkCampaign = link.utm_campaign ? "&utm_campaign=" + link.utm_campaign : "";
  const linkMedium = link.utm_medium ? "&utm_medium=" + link.utm_medium : "";
  const linkTerm = link.utm_term ? "&utm_term=" + link.utm_term : "";
  const linkContent = link.utm_content ? "&utm_content=" + link.utm_content : "";
  const goTo = link.url + "/?" + linkSource + linkCampaign + linkMedium + linkTerm + linkContent;

  return {
    redirect: {
      destination: goTo,
      permanent: true,
    },
  };
};

const Link: NextPage = () => {
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
