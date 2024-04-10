import * as React from "react";

import Heading from "../elements/Heading";
import { FaSearch } from "react-icons/fa";

const PatientList: React.FunctionComponent = () => {
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
        SecondHeading1={"Patient"}
        SecondHeading2={"List"}
        text={
          "Lorem ipsum dolor amet consectetur adipisicing eliteiuim sete eiusmod tempor incididunt ut labore etnalom dolore magna aliqua udiminimate veniam quis norud."
        }
      />
      <div className="h-[5%] flex justify-start space-x-2">
        <input type="text" placeholder="Search..." className="m-1"/>
        <button className="w-[55px] h-[42px] text-white bg-[#F36562] flex justify-center items-center"><FaSearch /></button>
      </div>
      <div className="h-[75%] w-full overflow-y-scroll">
        <table className="w-full h-full overflow-y-scroll">
          <tr className="h-[86px] sticky top-0 bg-white">
            <td className="text-center w-[15%] h-[86px]">P-ID</td>
            <td className="text-center w-[20%] h-[86px]">NAME</td>
            <td className="text-center w-[15%] h-[86px]">AGE</td>
            <td className="text-center w-[20%] h-[86px]">CONTACT NO</td>
            <td className="text-center w-[30%] h-[86px]">ACTION</td>
          </tr>
          {Tablearray.map((item, index) => (
            <tr
              key={index}
              className={`${index % 2 !== 0 ? "bg-[#F9F1F1]" : "bg-[#F0F0F0]"} h-[86px]  `}
            >
              <td className="w-[15%] text-center">{item.id}</td>
              <td className="w-[20%] text-center">{item.name}</td>
              <td className="w-[15%] text-center">{item.age}</td>
              <td className="w-[20%] text-center">{item.phno}</td>
              <td className="w-[30%] space-x-8">
                <button className="h-[41px] w-[95px] bg-[#FCA19F] hover:bg-[#F36562]">
                  DETAILS
                </button>
                
                <button className="h-[41px] w-[95px] bg-[#FCA19F] hover:bg-[#F36562]">
                  REPORT
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default PatientList;
