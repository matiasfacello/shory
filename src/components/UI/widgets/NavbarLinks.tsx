import Link from "next/link";

const NavbarLinks = () => {
  return (
    <>
      <ul className="hidden items-center justify-center gap-12 text-lg font-bold text-white/90 decoration-4 underline-offset-8 lg:flex">
        <li>
          <Link href="/" className="decoration-white/80 hover:text-white hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="/" className="decoration-white/80 hover:text-white hover:underline">
            Features
          </Link>
        </li>
        <li>
          <Link href="/" className="decoration-white/80 hover:text-white hover:underline">
            Pricing
          </Link>
        </li>
        <li>
          <Link href="/" className="decoration-white/80 hover:text-white hover:underline">
            Help
          </Link>
        </li>
      </ul>
    </>
  );
};

export default NavbarLinks;
