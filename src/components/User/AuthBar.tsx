import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const AuthBar: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <nav className="flex h-16 w-full items-center justify-between gap-4 bg-slate-900 px-20">
      <p className="text-center text-xl text-white">{sessionData && <span>{sessionData.user?.email}</span>}</p>
      {sessionData ? (
        <div className="flex justify-end gap-4 ">
          <Link
            className="rounded-full border border-white px-6 py-2 font-semibold text-white no-underline transition hover:bg-white/20"
            href="/settigns"
          >
            Settings
          </Link>
          <button
            className="rounded-full border border-white px-6 py-2 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      ) : (
        <div>
          <button
            className="rounded-full border border-white px-6 py-2 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        </div>
      )}
    </nav>
  );
};

export default AuthBar;
