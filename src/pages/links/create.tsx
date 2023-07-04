import PageLayout from "~/components/general/PageLayout";
import LinkAdd from "~/components/Links/Add";
import Cookies from "~/components/UI/widgets/Cookies";
import useCookies from "~/lib/hooks/general/useCookies";

export default function Home() {
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
}
