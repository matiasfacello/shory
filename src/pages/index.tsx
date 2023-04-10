import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import useCookies from "~/lib/hooks/general/useCookies";

import Cookies from "~/components/UI/widgets/Cookies";
import LinkList from "~/components/Links/ListForUser";
import PageLayout from "~/components/general/PageLayout";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  const showCookies = useCookies();

  return (
    <>
      <PageLayout>
        <div className="container m-auto px-4 py-16">
          {sessionData && <LinkList />}
          {!showCookies.knows && <Cookies showCookies={!showCookies.knows} />}
        </div>
      </PageLayout>
    </>
  );
};

export default Home;
