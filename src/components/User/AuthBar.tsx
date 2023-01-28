import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
// import { api } from "../../utils/api";

const AuthBar: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-wrap items-center justify-end h-16 gap-16 bg-slate-900">
      <p className="text-lg text-center text-white">{sessionData ? <span>{sessionData.user?.email}</span> : ""}</p>
      {sessionData ? (
        <div className="flex items-center justify-end gap-4 text-sm">
          <Link className="px-6 py-3 font-semibold text-center text-white no-underline transition border border-white rounded-full hover:bg-white/20" href="/settigns">
            Settings
          </Link>
          <button className="px-6 py-3 font-semibold text-center text-white no-underline transition border border-white rounded-full hover:bg-white/20" onClick={() => signOut()}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <button className="px-6 py-3 font-semibold text-center text-white no-underline transition border border-white rounded-full hover:bg-white/20" onClick={() => signIn()}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthBar;
