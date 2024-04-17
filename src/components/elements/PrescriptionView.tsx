import Image from "next/image";
import x from "/public/gojo.jpeg";
import { FaPlusCircle, FaPrint } from "react-icons/fa";
import { FaCircleMinus, FaCopy } from "react-icons/fa6";
import React, { useState } from "react";

const PrescriptionView: React.FunctionComponent = () => {
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => {
    setScale(scale + 0.1);
  };

  const handleZoomOut = () => {
    if (scale > 0.2) {
      setScale(scale - 0.1);
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-fit w-full flex-row justify-between bg-[#F0F0F0] p-[1%]">
        <div className="flex flex-col ">
          <span className=" space-x-5">
            <span className="font-bold text-black">P-ID:</span>
            <span>1234567</span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black">Name:</span>
            <span>Bal Majumdar</span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black">Age:</span>
            <span>56y</span>
          </span>
        </div>
        <div className="flex flex-col">
          <span className=" space-x-5">
            <span className="font-bold text-black">Date:</span>
            <span>10/05/2003</span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black">Time:</span>
            <span>10:30</span>
          </span>
        </div>
      </div>
      <div className="m-[1%] flex grow flex-row">
        <div className="h-full w-[50%] border-r flex flex-col  border-gray-700 space-y-[2%]">
          <div className="flex flex-row space-x-[2%] ">
            <select
              name=""
              id=""
              className="h-[42px] w-[310px] border border-[#DBDBDB] p-1"
            >
              <option value="">test1</option>
              <option value="">test1</option>
              <option value="">test1</option>
            </select>
            <button className="h-[42px] w-[103px] bg-[#F36562] text-white">
              <p>VIEW</p>
            </button>
            <div className="flex flex-row space-x-4">
              <div className="flex flex-col items-center justify-center">
                <FaCopy className="h-[32px] w-[32px] text-[#7E7E7E]" />
                <p className=" text-xs">Copy Data</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <FaPrint className="h-[32px] w-[32px] text-[#7E7E7E]" />
                <p className="text-xs">Print</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row space-x-[4%]" >
            <p className="font-bold">Symptoms:</p>
            <p>Pain in Abdomain</p>
          </div>
          <div className="flex flex-row space-x-[4%]" >
            <p className="font-bold">Diagonosis:</p>
            <p>Fatty Liver</p>
          </div>
          <div className="flex flex-row space-x-[4%]" >
            <p className="font-bold">BP:</p>
            <p>45/67</p>
          </div>
          <div className="flex flex-row space-x-[4%]" >
            <p className="font-bold">Weight:</p>
            <p>60</p>
          </div>
          <div className="">
            <p className="font-bold text-2xl mb-[2%]">Rx</p>
            <div className="flex flex-row space-x-[3%] ml-[4%]"><p>Medicine 1</p> <p>Twice Daily</p></div>
            <div className="flex flex-row space-x-[3%] ml-[4%]"><p>Medicine 1</p> <p>Twice Daily</p></div>
            <div className="flex flex-row space-x-[3%] ml-[4%]"><p>Medicine 1</p> <p>Twice Daily</p></div>
          </div>
          <div className="flex flex-row space-x-[4%]" >
            <p className="font-bold">Tests Todo:</p>
            <p>Test1</p>
            <p>Test1</p>
            <p>Test1</p>
          </div>
          <div className="flex flex-row space-x-[4%]" >
            <p className="font-bold">Note:</p>
            <p className="text-[#7E7E7E]">stryuhjgtyughgcrtyuhjgcfdryuguhvgchjtyfuyghvgchjtuygchfdt</p>
          </div>
          <div className="w-full flex justify-end pr-[5%]"><button className="h-[42px] w-[103px] bg-[#F36562] text-white">
              <p>Back</p>
            </button></div>
        </div>
        <div className="h-full w-[50%] border-l border-gray-700">
          <div className="mx-[2%] h-[10%] w-full">
            <div className="flex flex-row space-x-[2%] ">
              <select
                name=""
                id=""
                className="h-[42px] w-[310px] border border-[#DBDBDB] p-1"
              >
                <option value="">test1</option>
                <option value="">test1</option>
                <option value="">test1</option>
              </select>
              <button className="h-[42px] w-[103px] bg-[#F36562] text-white">
                <p>VIEW</p>
              </button>
            </div>
          </div>
          <div className="flex h-[90%] w-full flex-col">
            <div className="mx-[25%] h-96 w-64 overflow-hidden">
              <Image
                src={x}
                alt=""
                style={{ transform: `scale(${scale})` }}
                className="h-full w-full transform transition-transform duration-300 ease-in-out"
              />
            </div>
            <div className="mx-[2%] space-x-[2%]">
              <button onClick={handleZoomIn}>
                <FaPlusCircle />
              </button>
              <button onClick={handleZoomOut}>
                <FaCircleMinus />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionView;
