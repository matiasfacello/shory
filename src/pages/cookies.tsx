import PageLayout from "~/components/general/PageLayout";
import CookieSelector from "~/components/UI/CookieSelector";

export default function Settings() {
  return (
    <>
      <PageLayout>
        <div className="container m-auto px-4 py-16">
          <CookieSelector />
        </div>
      </PageLayout>
    </>
  );
}
