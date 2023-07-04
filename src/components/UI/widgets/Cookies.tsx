import type { CookiesType } from "cookies";
import { useRouter } from "next/router";

interface CookiesPopUpType {
  showCookies: boolean;
}

const Cookies = (props: CookiesPopUpType) => {
  const router = useRouter();

  const handleReject = () => {
    const data: CookiesType = {
      knows: true,
      acceptsAll: false,
    };
    localStorage.setItem("cookies", JSON.stringify(data));
    window.dispatchEvent(new Event("cookies"));
  };
  const handleCustomize = () => {
    router.push("/cookies");
  };
  const handleAccept = () => {
    const data: CookiesType = {
      knows: true,
      acceptsAll: true,
    };
    localStorage.setItem("cookies", JSON.stringify(data));
    window.dispatchEvent(new Event("cookies"));
  };

  return (
    <>
      {props.showCookies && (
        <div className="fixed bottom-0 left-0 right-0 w-full rounded bg-slate-100/80 py-6 px-8 text-sm shadow backdrop-blur transition md:right-auto md:bottom-6 md:left-6 md:max-w-sm">
          <h1 className="mb-4 text-2xl font-medium">Cookie Consent</h1>
          <p className="mb-8">
            <strong>Shory</strong> uses cookies to improve your experience. We store all our information anonimously and we only use it to improve our service and your experience.
          </p>
          <div className="flex flex-wrap items-center justify-around gap-2">
            <button onClick={handleReject} className="w-24 rounded bg-stone-700 py-2 px-3 font-medium text-white transition hover:bg-stone-800">
              Reject
            </button>
            <button onClick={handleCustomize} className="w-24 rounded bg-yellow-700 py-2 px-3 font-medium text-white transition hover:bg-yellow-800">
              Customize
            </button>
            <button onClick={handleAccept} className="w-24 rounded bg-green-700 py-2 px-3 font-medium text-white transition hover:bg-green-800">
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cookies;
