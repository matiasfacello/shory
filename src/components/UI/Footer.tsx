import Logo from "~/components/UI/widgets/Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="min-h-40 flex w-full flex-wrap items-center justify-between gap-4 bg-slate-900 px-6 lg:px-20">
      <div className="container mx-auto flex items-center justify-between gap-6 py-8">
        <div className="flex flex-col items-start justify-center gap-2">
          <Logo classBox="w-1/6 justify-start" />
          <p className="text-xs font-bold text-white">All rights reserved.</p>
        </div>
      </div>
      <div className="container mx-auto flex flex-col flex-wrap items-center justify-center gap-6 py-6 text-white md:flex-row md:justify-between">
        <Link href="/cookies" className="text-sm font-medium hover:underline">
          Customize Cookies
        </Link>
        <Link href="https://www.pristineshock.com/?utm-source=shory" target="_blank" className="text-sm font-bold decoration-2 hover:underline">
          Powered by PristineShock
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
