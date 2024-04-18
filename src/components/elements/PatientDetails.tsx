import React from "react";
import Heading from "./Heading";

const PatientDetails: React.FunctionComponent = () => {
  return (
    <div className="flex h-full items-center w-full flex-col">
      <Heading SecondHeading1={"Patient"} SecondHeading2={"Details"} text={""}/>
      <div className="flex h-fit w-full flex-row justify-between p-[1%] px-[20%]">
        <div className="flex flex-col justify-between w-[42%]">
          <span className=" space-x-5">
            <span className="font-bold text-black text-[20px]/[24px]">Patient ID:</span>
            <span>1234567</span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black text-[20px]/[24px]">Name:</span>
            <span>Bal Majumdar</span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black text-[20px]/[24px]">Father’s Name:</span>
            <span>Ashit Sharma</span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black text-[20px]/[24px]">Gender:</span>
            <span>Male</span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black text-[20px]/[24px]">Age:</span>
            <span>56y</span>
          </span>
        </div>
        <div className="flex flex-col space-y-[20%] w-[42%]">
          <span className=" space-x-5">
            <span className="font-bold text-black text-[20px]/[24px]">Contact No:</span>
            <span>+91 12345 67890</span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black text-[20px]/[24px]">Email:</span>
            <span>loremipsum@gmail.com</span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black text-[20px]/[24px]">Postal Address:</span>
            <span>45, Deshapran Sasmal Road opposite bhawani cinema Hall Near Rabindra Sarobar metro Gate no 6, Kolkata, West Bengal 700033, India</span>
          </span>
        </div>
      </div>
      <div className="w-full h-[20%] flex flex-row justify-center items-center space-x-4">
        <button className="w-[103px] h-[42px] bg-[#3D4460] text-white">Cancel</button>
        <button className="w-[103px] h-[42px] bg-[#F36562] text-white">Edit</button>
      </div>

    </div>
  );
};

export default PatientDetails;
