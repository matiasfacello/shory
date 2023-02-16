import Image from "next/image";
import Link from "next/link";
import AuthBar from "../User/AuthBar";

const Navbar: React.FC = () => {
  return (
    <nav className="flex h-24 w-full flex-wrap items-center justify-between gap-4 bg-slate-900 px-20">
      <div className="flex items-center justify-start gap-6">
        <Image src="/img/logo.svg" width={50} height={68} alt="Shory Logo" />
        <Link href="/" className="text-center text-5xl font-extrabold tracking-tight text-white">
          Shory
        </Link>
      </div>
      <AuthBar />
    </nav>
  );
};

export default Navbar;
