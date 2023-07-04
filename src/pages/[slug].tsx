import { formatLink } from "~/components/general/atoms/formatLink";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { Country, State } from "country-state-city";
import geoip from "geoip-lite";
import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head.js";
import Image from "next/image";
import requestIp from "request-ip";

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
  });

  if (!link)
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };

  const detectedIp = requestIp.getClientIp(context.req) || "";
  const geoIp = env.NODE_ENV == "production" ? geoip.lookup(detectedIp) : geoip.lookup("190.181.191.255"); // Random IP for testing purposes

  const goTo = formatLink(link);

  await prisma.sLinkClicks.create({
    data: {
      slug: link.slug,
      url: goTo,
      linkId: link.id,
      country: Country.getCountryByCode(geoIp?.country || "")?.name || null,
      region: State.getStateByCodeAndCountry(geoIp?.region || "", geoIp?.country || "")?.name || null,
      city: geoIp?.city || null,
      eurozone: geoIp?.eu || null,
      timezone: geoIp?.timezone || null,
      area: geoIp?.area || null,
    },
  });

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
