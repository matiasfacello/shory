import Puff from "~/assets/puff.svg";
import Image from "next/image";

const Loading = () => {
  return (
    <>
      <div className="min-w-screen -mt-32 flex min-h-screen flex-col items-center justify-center">
        <Image src={Puff} alt="Loading" width={50} height={50} />
        <h2 className="m-8 block text-2xl text-white">Loading</h2>
      </div>
    </>
  );
};

export default Loading;
