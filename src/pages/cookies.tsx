import PageLayout from "~/components/general/PageLayout";
import CookieSelector from "~/components/UI/CookieSelector";
import type { NextPage } from "next";

const Settings: NextPage = () => {
  return (
    <>
      <PageLayout>
        <div className="container m-auto px-4 py-16">
          <CookieSelector />
        </div>
      </PageLayout>
    </>
  );
};

export default Settings;
