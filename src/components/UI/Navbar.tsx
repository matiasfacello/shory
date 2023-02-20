import Image from "next/image";
import logo from "~/../public/img/logo.svg";
import Link from "next/link";

import AuthBar from "~/components/User/AuthBar";
import NavbarLinks from "~/components/UI/widgets/NavbarLinks";

const Navbar: React.FC = () => {
  return (
    <nav className=" flex h-24 w-full flex-wrap items-center justify-between gap-4 bg-slate-900 px-6 lg:px-20">
      <div className="container mx-auto flex items-center justify-between gap-6">
        <Link href="/" className="flex w-1/6 items-center justify-start gap-2 text-center text-2xl font-extrabold tracking-tight text-white lg:gap-4 lg:text-4xl">
          <Image src={logo} alt="Shory Logo" className="w-8 lg:w-10" />
          Shory
        </Link>
        <NavbarLinks />
        <AuthBar />
      </div>
    </nav>
  );
};

export default Navbar;
