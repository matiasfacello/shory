import { useRouter } from "next/router";
// import { useEffect } from "react";

const Link = () => {
  const router = useRouter();
  const { slug } = router.query;

  const link = async () => {
    const link = await fetch(`/api/get-url/${slug}`);

    if (link.status === 404) {
      router.replace("/");
    }

    const url = await link.json();

    if (url?.url) {
      router.replace(url.url);
    }
  };

  link();

  return (
    <>
      <div className="h-full w-full bg-black"></div>
    </>
  );
};

export default Link;
