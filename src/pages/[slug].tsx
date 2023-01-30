//import type { InferGetStaticPropsType } from "next"; { link }: InferGetStaticPropsType<typeof getStaticProps>
import Image from "next/image";
import { env } from "../env/server.mjs";

interface Link {
  url: string;
  slug: string;
  utm_campaign: string;
  utm_content: string;
  utm_medium: string;
  utm_source: string;
  utm_term: string;
}

interface Context {
  params: {
    slug: string;
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

  if (link.status === "error") {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

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

function Link() {
  return (
    <>
      <div className="min-w-screen flex min-h-screen flex-col items-center justify-center bg-slate-900">
        <Image src="/img/puff.svg" alt="Loading" width={50} height={50} />
        <h2 className="m-8 block text-2xl text-white">Redirecting</h2>
      </div>
    </>
  );
}

export default Link;
