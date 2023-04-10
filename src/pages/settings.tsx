import type { NextPage } from "next";
import Router from "next/router";
import { useSession } from "next-auth/react";
import ChangeUsername from "~/components/User/ChangeUsername";
import DeleteUser from "~/components/User/DeteleUser";
import PageLayout from "~/components/general/PageLayout";

const Settings: NextPage = () => {
  useSession({
    required: true,
    onUnauthenticated() {
      Router.push("/");
    },
  });

  return (
    <>
      <PageLayout>
        <div className="container m-auto px-4 py-16">
          <ChangeUsername />
          <DeleteUser />
        </div>
      </PageLayout>
    </>
  );
};

export default Settings;
