import logo from "~/../public/img/logo.svg";
import Image from "next/image";
import Link from "next/link";

interface FieldProps {
  classBox?: string;
  classImage?: string;
  classText?: string;
}

const Logo = (props: FieldProps) => {
  return (
    <Link href="/" className={"flex items-center gap-2 text-2xl font-extrabold tracking-tight text-white lg:gap-4 lg:text-4xl " + props.classBox}>
      <Image src={logo} alt="Shory Logo" className={"w-8 lg:w-10 " + props.classImage} />
      <span className={props.classText}>Shory</span>
    </Link>
  );
};

export default Logo;
