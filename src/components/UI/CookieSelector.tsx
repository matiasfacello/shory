import UserSettingsBox from "~/components/User/atom/UserSettingsBox";
import useCookies from "~/lib/hooks/general/useCookies";
import type { CookiesType } from "cookies";
import Image from "next/image";
import { useEffect, useState } from "react";

const CookieSelector: React.FC = () => {
  const localCookies = useCookies();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [acceptsAll, setAcceptsAll] = useState<boolean>();

  useEffect(() => {
    setAcceptsAll(localCookies?.acceptsAll);
    setLoaded(true);
  }, [localCookies]);

  const handleAcceptAll = () => {
    setAcceptsAll(!acceptsAll);
    const data: CookiesType = {
      knows: true,
      acceptsAll: !acceptsAll,
    };
    localStorage.setItem("cookies", JSON.stringify(data));
    window.dispatchEvent(new Event("cookies"));
  };

  return (
    <>
      <UserSettingsBox>
        <div className="flex w-full max-w-xl flex-col gap-6 rounded-xl bg-gray-900 py-8 px-12">
          <UserSettingsBox.Title title="Cookie Selector" />
          {loaded ? (
            <>
              <p className="text-white">
                <strong>Shory</strong> uses cookies to improve your experience. We store all our information anonimously and we only use it to improve our service and your experience.
              </p>
              <hr className="my-2 w-full border-t-2" />
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex flex-grow flex-col">
                    <span className="font-medium text-white" id="availability-label">
                      Accept All
                    </span>
                    <span className="text-sm text-gray-100" id="availability-description">
                      Accept all the cookies.
                    </span>
                  </span>
                  <button
                    role="switch"
                    aria-checked={acceptsAll}
                    aria-labelledby="availability-label"
                    aria-describedby="availability-description"
                    onClick={handleAcceptAll}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                      acceptsAll ? "bg-green-600" : "bg-red-400"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        acceptsAll ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center">
              <Image src="/img/puff.svg" alt="Loading" width={50} height={50} />
            </div>
          )}
        </div>
      </UserSettingsBox>
    </>
  );
};

export default CookieSelector;
