import { Icon } from "@iconify-icon/react";
import Logo from "~/components/UI/widgets/Logo";
import { authOptions } from "~/server/auth";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth/next";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SignIn({ providers, csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [showForm, setShowForm] = useState<boolean>(true);
  const [emailForm, setEmailForm] = useState<string>();

  const router = useRouter();
  const { error } = router.query;

  const [showError, setShowError] = useState<string>();

  useEffect(() => {
    switch (error) {
      case "OAuthSignin":
        setShowError("Error: cannot create authorization");
        break;
      case "OAuthCallback":
        setShowError("Error: fail from OAuth provider");
        break;
      case "OAuthCreateAccount":
        setShowError("Error: oAuth provider failed to be created");
        break;
      case "EmailCreateAccount":
        setShowError("Error: user failed to be created");
        break;
      case "Callback":
        setShowError("Error: callback handler");
        break;
      case "OAuthAccountNotLinked":
        setShowError("Error: account already linked");
        break;
      case "EmailSignin":
        setShowError("Error: verification token failed");
        break;
      case "CredentialsSignin":
        setShowError("Error: verification failed");
        break;
      case "SessionRequired":
        setShowError("Error: could not find session");
        break;
      default:
        setShowError(error as string);
    }
  }, [error]);

  const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setEmailForm(event.currentTarget.value);
  };

  return (
    <>
      <Head>
        <title>Login - Shory</title>
        <meta name="description" content="Shory - Create your short links and track them!" />
        <link rel="icon" href="/img/logo.svg" />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 ">
        <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center">
          <Logo classBox="mb-16" classImage="w-10" classText="text-5xl" />
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-gradient-to-b from-slate-800 to-slate-700 p-8 text-white md:py-12 md:px-24">
            <h1 className="text-4xl font-bold">Log In</h1>
            <hr className="my-8 w-full border-white" />
            {Object.values(providers)
              .slice(0, -1)
              .map((provider) => (
                <div key={provider.name} className="flex w-64 cursor-pointer items-center justify-center rounded-xl bg-slate-100 py-3 hover:bg-white" onClick={() => signIn(provider.id)}>
                  <Icon icon="logos:discord" height={40} />
                </div>
              ))}
            <hr className="my-8 w-full border-white" />
            {showForm ? (
              <form method="post" action="/api/auth/signin/email" className="flex flex-col items-center justify-center gap-4">
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <label htmlFor="email" className="text-2xl font-bold">
                  Email address
                </label>
                <input type="email" id="email" name="email" className="mb-2 w-64 rounded bg-gray-800 p-4" placeholder="mail@mail.com" required min={6} onChange={handleChange} />
                <button
                  onClick={() => {
                    setShowForm(false);
                    signIn("email", { email: emailForm });
                  }}
                  className="flex w-48 cursor-pointer items-center justify-center rounded-full bg-slate-100 py-3 text-lg font-bold text-black hover:bg-white"
                  type="submit"
                >
                  Sign in with Email
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Image src="/img/puff.svg" alt="Loading" width={50} height={50} />
                <h2 className="m-8 block text-2xl text-white">Loading...</h2>
              </div>
            )}
            <hr className="my-8 w-full border-white" />
            {error && <h3 className="rounded bg-red-100 p-4 text-xl font-medium text-red-900">{showError}</h3>}
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  const csrfToken = await getCsrfToken(context);

  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { csrfToken, providers: providers ?? [] },
  };
}
