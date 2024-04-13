import * as React from "react";

import Heading from "../elements/Heading";
import { FaSearch } from "react-icons/fa";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const NewAppointments: React.FunctionComponent = () => {
  const { data, isLoading, isError } = api.patient.get_all.useQuery();
  const [searchData, setSearchData] = React.useState("");
  const router = useRouter();
  return (
    <div className="h-full w-full">
      <Heading
        SecondHeading1={"New Appointment"}
        SecondHeading2={"List"}
        text={
          "Lorem ipsum dolor amet consectetur adipisicing eliteiuim sete eiusmod tempor incididunt ut labore etnalom dolore magna aliqua udiminimate veniam quis norud."
        }
      />
      <div className="flex h-[5%] justify-start space-x-2">
        <input
          type="text"
          placeholder="Search..."
          className="m-1"
          onChange={(e) => {
            setSearchData(e.target.value);
          }}
        />
        {/* <input type="date" className="m-1" /> */}
        <button className="flex h-[42px] w-[55px] items-center justify-center bg-[#F36562] text-white">
          <FaSearch />
        </button>
      </div>
      <div className="h-[75%] w-full">
        <div className="flex h-full w-full flex-col overflow-y-scroll">
          <div className="sticky top-0 flex h-[86px] w-full flex-row bg-white">
            <div className="flex  h-[86px] w-[15%] items-center justify-center text-center">
              P-ID
            </div>
            <div className="flex  h-[86px] w-[20%] items-center justify-center text-center">
              NAME
            </div>
            <div className="flex  h-[86px] w-[15%] items-center justify-center text-center">
              AGE
            </div>
            <div className="flex  h-[86px] w-[20%] items-center justify-center text-center">
              CONTACT NO
            </div>
            <div className="flex  h-[86px] w-[30%] items-center justify-center text-center">
              ACTION
            </div>
          </div>
          {data
            ?.filter(
              (item) =>
                searchData === "" ||
                item.patient_id.includes(searchData) ||
                item.first_name.includes(searchData) ||
                item.last_name.includes(searchData),
            )
            .map((item, index) => (
              <div
                key={index}
                className={`${index % 2 !== 0 ? "bg-[#F9F1F1]" : "bg-[#F0F0F0]"} flex h-[86px]`}
              >
                <div className="flex  w-[15%] items-center justify-center">
                  {item.patient_id}
                </div>
                <div className="flex  w-[20%] items-center justify-center">
                  {item.first_name} {item.last_name}
                </div>
                <div className="flex w-[15%] items-center justify-center">
                  {item.age}
                </div>
                <div className="flex  w-[20%] items-center justify-center">
                  {item.contact_number.toString()}
                </div>
                <div className="flex w-[30%] items-center space-x-4">
                  <button className="h-[41px] w-[95px] bg-[#FCA19F] hover:bg-[#F36562]">
                    DETAILS
                  </button>
                  <button
                    className="h-[41px] w-[95px] bg-[#FCA19F] hover:bg-[#F36562]"
                    onClick={() => {
                      router.push({
                        pathname: "patient-prescription",
                        query: { patient_id: item.patient_id },
                      });
                    }}
                  >
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
