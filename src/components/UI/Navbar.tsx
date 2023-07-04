import Logo from "~/components/UI/widgets/Logo";
import NavbarLinks from "~/components/UI/widgets/NavbarLinks";
import AuthBar from "~/components/User/AuthBar";

const Navbar: React.FC = () => {
  return (
    <nav className=" flex h-24 w-full flex-wrap items-center justify-between gap-4 bg-slate-900 px-6 lg:px-20">
      <div className="container mx-auto flex items-center justify-between gap-6">
        <Logo classBox="w-1/6 justify-start" />
        <NavbarLinks />
        <AuthBar />
      </div>
    </nav>
  );
};

export default Navbar;
