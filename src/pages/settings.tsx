import PageLayout from "~/components/general/PageLayout";
import ChangeUsername from "~/components/User/ChangeUsername";
import DeleteUser from "~/components/User/DeteleUser";
import { useSession } from "next-auth/react";
import Router from "next/router";

export default function Settings() {
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
}
