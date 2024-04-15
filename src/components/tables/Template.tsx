import React from "react";
import Heading from "../elements/Heading";
import { FaSearch, FaEdit } from "react-icons/fa";

const Template: React.FunctionComponent = () => {
  const arr = [
    "Template1",
    "Template1",
    "Template1",
    "Template1",
    "Template1",
    "Template1",
    "Template1",
    "Template1",
    "Template1",
    "Template1",
    "Template1",
  ];
  return (
    <div className="h-full w-full">
      <div className="relative h-fit w-full">
        <button className="absolute left-[83.7%] top-[5%] h-[41px] w-[182px] rounded-md bg-[#F36562] text-white">
          ADD NEW TEMPLATE
        </button>
        <Heading
          SecondHeading1="Templates"
          SecondHeading2=""
          text="Lorem ipsum dolor amet consectetur adipisicing eliteiuim sete eiusmod tempor incididunt ut 
labore etnalom dolore magna aliqua udiminimate veniam quis norud"
        />
      </div>
      <div className="flex w-full flex-row space-x-[3%]">
        <input
          type="text"
          placeholder="Search"
          className="ml-[1%] rounded-sm border border-[#DBDBDB] bg-[#FFFDFD] p-[1%]"
        />{" "}
        <button className="flex h-[42px] w-[55px] items-center justify-center bg-[#F36562] text-white">
          <FaSearch />
        </button>
      </div>
      <div className="h-[66%] w-full flex-col overflow-y-scroll">
        <div className="flex flex-col">
          <div className="sticky top-0 flex h-[86px] w-full flex-row items-center justify-around bg-white">
            <div>Template</div>
            <div>Action</div>
          </div>
          {arr.map((item, index) => (
            <div
              key={index}
              className={`${index % 2 !== 0 ? "bg-[#F9F1F1]" : "bg-[#F0F0F0]"} flex h-[86px] w-full flex-row items-center justify-around`}
            >
              <div>{item}</div>
              <div className="text-[#F36562] w-10 text-center">
                <FaEdit />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Template;
