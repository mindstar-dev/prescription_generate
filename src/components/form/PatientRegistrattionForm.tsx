import React from "react";

const PatientRegistrattionForm: React.FunctionComponent = () => {
  return (
    <div className="mx-[10%] my-[5%] h-[90%] w-[80%] ">
        <div className="w-full flex justify-center">Registration</div>
      <form action="" className="h-full w-full space-y-4">
        <div className="flex h-[5%] flex-row justify-between">
          <input
            type="text"
            placeholder="first name"
            className="h-full w-[44%] border-b border-black"
          />
          <input
            type="text"
            placeholder="last name"
            className="h-full w-[44%] border-b border-black"
          />
        </div>
        <div className="flex h-[5%] flex-row justify-between">
          <input
            type="text"
            placeholder="Contact No"
            className="h-full w-[44%] border-b border-black"
          />
          <input
            type="text"
            placeholder="Email"
            className="h-full w-[44%] border-b border-black"
          />
        </div>
        <div className="flex h-[5%] flex-row justify-between">
          <input
            type="text"
            placeholder="Patient Id"
            className="h-full w-[44%] border-b border-black"
          />
          <input
            type="text"
            placeholder="Gender"
            className="h-full w-[44%] border-b border-black"
          />
        </div>
        <div className="flex h-[5%] flex-row justify-between">
          <input
            type="text"
            placeholder="Father/Husband's Name "
            className="h-full w-[44%] border-b border-black"
          />
          <input
            type="text"
            placeholder="Age"
            className="h-full w-[44%] border-b border-black"
          />
        </div>
        <div className="">Patient's Address</div>
        <div className="flex h-[5%] flex-col justify-between">
          <input
            type="text"
            placeholder="Address Line 1"
            className="h-full w-full border-b border-black"
          />
        </div>
        <div className="flex h-[5%] flex-col justify-between">
          <input
            type="text"
            placeholder="Address Line 2"
            className="h-full w-full border-b border-black"
          />
        </div>
        <div className="flex h-[5%] flex-row justify-between">
          <select
            name=""
            id=""
            className="h-full w-[44%] border-b border-black"
          >
            <option value="" disabled selected>
              City
            </option>
          </select>
          <input
            type="text"
            placeholder="State"
            className="h-full w-[44%] border-b border-black"
          />
        </div>
        <div className="flex h-[5%] flex-row justify-between">
          <select
            name=""
            id=""
            className="h-full w-[44%] border-b border-black"
          >
            <option value="" disabled selected>
              Postal Code
            </option>
          </select>
          <input
            type="text"
            placeholder="Country"
            className="h-full w-[44%] border-b border-black"
          />
        </div>
        <div className="w-full flex justify-center h-[4%] text-white space-x-8"> <button className="w-[103px] bg-[#3D4460] h-full">Cancle</button><button className="w-[103px] bg-[#F36562] h-full">Save</button> </div>
      </form>
    </div>
  );
};

export default PatientRegistrattionForm;
