import type { CookiesType } from "cookies";
import { useEffect, useMemo, useState } from "react";

const useCookies = () => {
  const fillerCookies: CookiesType = useMemo(() => {
    return { knows: true, acceptsAll: false };
  }, []);
  const emptyCookies: CookiesType = useMemo(() => {
    return { knows: false, acceptsAll: false };
  }, []);

  const [cookiesObject, setCookiesObject] = useState<CookiesType>(fillerCookies);

  useEffect(() => {
    if (!localStorage.getItem("cookies")) localStorage.setItem("cookies", JSON.stringify(emptyCookies));
    setCookiesObject(JSON.parse(localStorage.getItem("cookies") || JSON.stringify(fillerCookies)));

    window.addEventListener("cookies", () => {
      setCookiesObject(JSON.parse(localStorage.getItem("cookies") || JSON.stringify(fillerCookies)));
    });
  }, [fillerCookies, emptyCookies]);

  return cookiesObject;
};

export default useCookies;
