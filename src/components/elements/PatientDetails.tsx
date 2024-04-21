import React from "react";
import Heading from "./Heading";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
interface PatientDetailsProps {
  patient_id: string;
}
const PatientDetailsComponent: React.FunctionComponent<PatientDetailsProps> = (
  props,
) => {
  const router = useRouter();
  const { data } = api.patient.find_by_id.useQuery(props.patient_id);
  return (
    <div className="flex h-full w-full flex-col items-center">
      <Heading
        SecondHeading1={"Patient"}
        SecondHeading2={"Details"}
        text={""}
      />
      <div className="flex h-fit w-full flex-row justify-between p-[1%] px-[20%]">
        <div className="flex w-[42%] flex-col justify-between">
          <span className=" space-x-5">
            <span className="text-[20px]/[24px] font-bold text-black">
              Patient ID:
            </span>
            <span>{data?.patient_id}</span>
          </span>
          <span className=" space-x-5">
            <span className="text-[20px]/[24px] font-bold text-black">
              Name:
            </span>
            <span>{`${data?.first_name}-${data?.last_name}`}</span>
          </span>
          <span className=" space-x-5">
            <span className="text-[20px]/[24px] font-bold text-black">
              Father’s Name:
            </span>
            <span>{data?.fathers_name}</span>
          </span>
          <span className=" space-x-5">
            <span className="text-[20px]/[24px] font-bold text-black">
              Gender:
            </span>
            <span>{data?.gender}</span>
          </span>
          <span className=" space-x-5">
            <span className="text-[20px]/[24px] font-bold text-black">
              Age:
            </span>
            <span>{data?.age}Y</span>
          </span>
        </div>
        <div className="flex w-[42%] flex-col space-y-[20%]">
          <span className=" space-x-5">
            <span className="text-[20px]/[24px] font-bold text-black">
              Contact No:
            </span>
            <span>{data?.contact_number.toString()}</span>
          </span>
          <span className=" space-x-5">
            <span className="text-[20px]/[24px] font-bold text-black">
              Email:
            </span>
            <span>{data?.email_id}</span>
          </span>
          <span className=" space-x-5">
            <span className="text-[20px]/[24px] font-bold text-black">
              Postal Address:
            </span>
            <span>{`${data?.address_line1}, ${data?.address_line2}`}</span>
          </span>
        </div>
      </div>
      <div className="flex h-[20%] w-full flex-row items-center justify-center space-x-4">
        <button
          className="h-[42px] w-[103px] bg-[#3D4460] text-white"
          onClick={() => {
            router.back();
          }}
        >
          Cancel
        </button>
        <button
          className="h-[42px] w-[103px] bg-[#F36562] text-white"
          onClick={() => {
            router.push({
              pathname: "patient-details-edit",
              query: {
                patient_id: props.patient_id,
              },
            });
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default PatientDetailsComponent;
