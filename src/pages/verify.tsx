import Logo from "~/components/UI/widgets/Logo";
import Head from "next/head";

export default function SignIn() {
  return (
    <>
      <Head>
        <title>Login - Shory</title>
        <meta name="description" content="Shory - Create your short links and track them!" />
        <link rel="icon" href="/img/logo.svg" />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center">
          <Logo classBox="mb-16" classImage="w-10" classText="text-5xl" />
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-gradient-to-b from-slate-800 to-slate-700 p-8 text-white md:py-12 md:px-24">
            <h1 className="text-4xl font-bold">Log In</h1>
            <hr className="my-8 w-full border-white" />
            <p className="text-xl font-medium">Please, verify your email account.</p>
            <hr className="my-8 w-full border-white" />
          </div>
        </div>
      </main>
    </>
  );
}
