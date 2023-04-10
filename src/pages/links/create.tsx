import type { NextPage } from "next";
import useCookies from "~/lib/hooks/general/useCookies";

import Cookies from "~/components/UI/widgets/Cookies";
import PageLayout from "~/components/general/PageLayout";
import LinkAdd from "~/components/Links/Add";

const Home: NextPage = () => {
  const showCookies = useCookies();

  return (
    <>
      <PageLayout>
        <div className="container m-auto px-4 py-16">
          <LinkAdd />
          {!showCookies.knows && <Cookies showCookies={!showCookies.knows} />}
        </div>
      </PageLayout>
    </>
  );
};

export default Home;
