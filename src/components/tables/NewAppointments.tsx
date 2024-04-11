import * as React from "react";

import Heading from "../elements/Heading";
import { FaSearch } from "react-icons/fa";

const NewAppointments: React.FunctionComponent = () => {
  const Tablearray = [
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
    {
      id: 1234,
      name: "Raj",
      age: "45y",
      phno: "+919123949975",
    },
  ];

  return (
    <div className="h-full w-full">
      <Heading
        SecondHeading1={"New Appointment"}
        SecondHeading2={"List"}
        text={
          "Lorem ipsum dolor amet consectetur adipisicing eliteiuim sete eiusmod tempor incididunt ut labore etnalom dolore magna aliqua udiminimate veniam quis norud."
        }
      />
      <div className="h-[5%] flex justify-start space-x-2">
        <input type="text" placeholder="Search..." className="m-1"/>
        <input type="date" className="m-1" />
        <button className="w-[55px] h-[42px] text-white bg-[#F36562] flex justify-center items-center"><FaSearch /></button>
      </div>
      <div className="h-[75%] w-full overflow-y-scroll">
        <div className="w-full h-full overflow-y-scroll flex flex-col">
          <div className="h-[86px] sticky top-0 bg-white">
            <div className="text-center w-[15%] h-[86px]">P-ID</div>
            <div className="text-center w-[20%] h-[86px]">NAME</div>
            <div className="text-center w-[15%] h-[86px]">AGE</div>
            <div className="text-center w-[20%] h-[86px]">CONTACT NO</div>
            <div className="text-center w-[30%] h-[86px]">ACTION</div>
          </div>
          {Tablearray.map((item, index) => (
          <div
            key={index}
            className={`${index % 2 !== 0 ? "bg-[#F9F1F1]" : "bg-[#F0F0F0]"} flex h-[86px]`}
          >
            <div className="w-[15%] text-center flex items-center">{item.id}</div>
            <div className="w-[20%] text-center flex items-center">{item.name}</div>
            <div className="w-[15%] text-center flex items-center">{item.age}</div>
            <div className="w-[20%] text-center flex items-center">{item.phno}</div>
            <div className="w-[30%] space-x-4 flex items-center">
              <button className="h-[41px] w-[95px] bg-[#FCA19F] hover:bg-[#F36562]">
                DETAILS
              </button>
              <button className="h-[41px] w-[95px] bg-[#FCA19F] hover:bg-[#F36562]">
                ATTEND
              </button>
              <button className="h-[41px] w-[95px] bg-[#FCA19F] hover:bg-[#F36562]">
                REPORT
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default NewAppointments;
