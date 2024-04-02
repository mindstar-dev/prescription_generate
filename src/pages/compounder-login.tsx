import * as React from "react";
import img from "../../images/medical-banner-with-doctor-patient 1.png";
import img2 from "../../images/healthcare-logo .png";
import { useRouter } from "next/router";
import Image from "next/image";
import { FaEye, FaUser } from "react-icons/fa";

const CompounderLogin: React.FunctionComponent = () => {
  const router = useRouter();
  return (
    <>
      <title></title>
      <main className="flex h-screen w-screen flex-nowrap items-center justify-center bg-cover bg-center bg-no-repeat">
        <div className="relative flex h-screen w-2/3 flex-wrap">
          <Image
            src={img}
            alt="Description of the image"
            className="h-full w-full"
            objectFit="cover"
            objectPosition="center"
          />
          <div className="absolute z-10 flex h-full w-full flex-col justify-center bg-[#3D4461C7]">
            <p className="mb-4 ml-12 text-7xl font-bold text-[#F36562]">
              The Care &
            </p>
            <p className="mb-4 ml-12 text-7xl font-bold text-white">
              Compression
            </p>
            <p className="mb-4 ml-12 text-7xl font-bold text-[#F36562]">
              You Need
            </p>
          </div>
        </div>
        <div className="flex h-screen w-1/3 flex-col items-center justify-evenly">
          <Image
            src={img2}
            alt="Description of the image"
            className="h-1/12 w-4/5"
          />
          <p className="border-b-2 border-[#F36562] p-4 text-3xl font-medium text-[#3D4460]">
            SIGN IN
          </p>
          <div className="flex h-1/5 w-3/4 flex-col justify-between">
            <div className="flex h-1/3 w-full items-center justify-between rounded-xl border-2 border-[#969696]">
              <input
                placeholder="Enter User-id"
                className="ml-1 h-5/6 w-4/5 outline-none"
              />
              <FaUser className="mr-4 h-5 w-5" />
            </div>
            <div className="flex h-1/3 w-full items-center justify-between rounded-xl border-2 border-[#969696]">
              <input
                placeholder="Enter User-id"
                className="ml-1 h-5/6 w-4/5 outline-none"
              />
              <FaEye className="mr-4 h-5 w-5" />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-4 h-4 w-4 text-lg font-normal"
              />
              <p>Remember Me</p>
            </div>
          </div>
          <button className="flex h-[6%] w-1/5 items-center justify-center rounded-2xl bg-[#3D4460] text-center text-2xl font-medium text-white">
            Submit
          </button>
          <p
            className="cursor-pointer font-bold text-[#F36562]"
            onClick={async () => {
              await router.push({
                pathname: "/doctor-login",
              });
            }}
          >
            Sign In As Doctor
          </p>
        </div>
      </main>
    </>
  );
};

export default CompounderLogin;
