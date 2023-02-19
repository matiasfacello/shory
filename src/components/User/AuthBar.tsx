import { Icon } from "@iconify-icon/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

import useUserSubCheck from "../../lib/hooks/user/useUserSubCheck";

const AuthBar: React.FC = () => {
  const { data: sessionData } = useSession();

  const subscription = useUserSubCheck(sessionData?.user.id || "");

  const [openMenu, setOpenMenu] = useState(false);
  const menuClass = "fixed top-0 bottom-0 right-0 w-full lg:w-96 backdrop-blur-lg border-l-2 bg-slate-900/90 transition-all delay-150 duration-500  ";
  const drawerRef = useRef(null);

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setOpenMenu(false);
    });
  }, [openMenu]);

  return (
    <>
      {sessionData ? (
        <>
          <div
            className="flex h-16 w-1/6 items-center justify-end gap-4"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Icon
              icon="ci:hamburger"
              height={32}
              width={32}
              className="cursor-pointer text-white"
              onClick={() => {
                setOpenMenu(true);
              }}
            />
          </div>
          <div className={openMenu ? menuClass + "" : menuClass + "translate-x-full"} ref={drawerRef} onClick={(e) => e.stopPropagation()}>
            <header className="flex items-center justify-end py-8 px-16">
              <Icon
                icon="material-symbols:close"
                height={32}
                width={32}
                className="cursor-pointer text-white"
                onClick={() => {
                  setOpenMenu(false);
                }}
              />
            </header>
            <div className="flex items-center justify-center gap-4">
              <p className="text-xl font-bold text-white">{sessionData.user?.name ? sessionData.user?.name : sessionData.user?.email}</p>
              <Image src={sessionData.user.image || ""} alt={sessionData.user?.email || "User Avatar"} className="rounded-full" width={32} height={32} />
            </div>
            <div className="mt-16 flex h-full flex-col items-center justify-start gap-2 font-bold text-white">
              <Link className="w-full border-t border-b bg-slate-900 px-8 py-6 transition hover:bg-slate-800 hover:text-white/90 hover:underline" href="/links">
                Links
              </Link>
              <Link className="w-full border-t border-b bg-slate-900 px-8 py-6 transition hover:bg-slate-800 hover:text-white/90 hover:underline" href="/settings">
                Settings
              </Link>
              <button
                className="mt-32 rounded-full border border-white bg-slate-800 px-6 py-3 text-center font-semibold text-white no-underline transition hover:bg-slate-700"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <button className="rounded-full border border-white bg-slate-800 px-6 py-3 text-center font-semibold text-white no-underline transition hover:bg-slate-700" onClick={() => signIn()}>
              Login
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default AuthBar;
