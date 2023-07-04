import PageLayout from "~/components/general/PageLayout";
import LinkList from "~/components/Links/ListForUser";
import Cookies from "~/components/UI/widgets/Cookies";
import useCookies from "~/lib/hooks/general/useCookies";
import { useSession } from "next-auth/react";

export default function Home() {
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
}
