import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
// import { api } from "../../utils/api";

const AuthBar: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex h-16 flex-wrap items-center justify-end gap-16 bg-slate-900">
      <p className="text-center text-lg text-white">{sessionData ? <span>{sessionData.user?.email}</span> : ""}</p>
      {sessionData ? (
        <div className="flex items-center justify-end gap-4 text-sm">
          <Link className="rounded-full border border-white px-6 py-3 text-center font-semibold text-white no-underline transition hover:bg-white/20" href="/settings">
            Settings
          </Link>
          <button className="rounded-full border border-white px-6 py-3 text-center font-semibold text-white no-underline transition hover:bg-white/20" onClick={() => signOut()}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <button className="rounded-full border border-white px-6 py-3 text-center font-semibold text-white no-underline transition hover:bg-white/20" onClick={() => signIn()}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthBar;
