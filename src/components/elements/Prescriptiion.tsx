import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaCheck, FaCross } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { api } from "~/utils/api";

const Prescriptiion: React.FunctionComponent = () => {
  const router = useRouter();
  const { patient_id } = router.query;
  const date = new Date();
  const { data: patient } = api.patient.find_by_id.useQuery(
    patient_id as string,
  );
  const [prescriptionData, setPrescriptionData] = useState({
    patient_id: patient_id as string,
    date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
    is_template: false,
    symptom: "",
    bp: "",
    diagnosis: "",
    weight: "",
    note: "",
    medicine: [] as {
      medicine: string;
      repeatitions: string;
      timing: string;
    }[],
  });
  const [medicineList, setMedicineList] = useState({
    medicine: "",
    repeatitions: "",
    timing: "",
  });
  const handleSave = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMedicineList({
      ...medicineList,
      [name]: value,
    });
  };
  const { data: symptom } = api.symptom.get_all.useQuery();

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-fit w-full flex-row justify-between bg-[#F0F0F0] p-[1%]">
        <div className="flex flex-col ">
          <span className=" space-x-5">
            <span className="font-bold text-black">P-ID:</span>
            <span>{patient?.patient_id}</span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black">Name:</span>
            <span>
              {patient?.first_name} {patient?.last_name}
            </span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black">Age:</span>
            <span>{patient?.age}y</span>
          </span>
        </div>
        <div className="flex flex-col">
          <span className=" space-x-5">
            <span className="font-bold text-black">Date:</span>
            <span>
              {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
            </span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black">Time:</span>
            <span>
              {date.getHours()}:
              {date.getMinutes() < 10
                ? `0${date.getMinutes()}`
                : date.getMinutes()}
            </span>
          </span>
        </div>
      </div>
      <div className="flex h-full w-full">
        <div className="my-2 flex h-[99%] w-4/5 flex-col self-center border-r-2 border-[#958E8E]">
          <div className="flex h-[15%] w-full flex-col justify-evenly ">
            <div className="flex h-[45%] w-[85%] ">
              <div className="ml-2 flex h-full w-1/2 items-center justify-between ">
                <p className="w-[20%] text-lg font-bold">Symptoms</p>
                <input
                  type="text"
                  placeholder="Enter Symptoms"
                  className="m-2 h-full w-[70%] border-2 border-black p-2"
                />
              </div>
              <div className="ml-2 flex h-full w-1/2 items-center justify-between ">
                <p className="w-[20%] text-lg font-bold">BP</p>
                <input
                  type="text"
                  placeholder="Enter BP"
                  className="m-2 h-full w-[70%] border-2 border-black p-2"
                />
              </div>
            </div>
            <div className="flex h-[45%] w-[85%] ">
              <div className="ml-2 flex h-full w-1/2 items-center justify-between ">
                <p className="w-[20%] text-lg font-bold">Diagnosis</p>
                <input
                  type="text"
                  placeholder="Enter Diagnosis"
                  className="m-2 h-full w-[70%] border-2 border-black p-2"
                />
              </div>
              <div className="ml-2 flex h-full w-1/2 items-center justify-between ">
                <p className="w-[20%] text-lg font-bold">Weight</p>
                <input
                  type="text"
                  placeholder="Enter Weight (in Kg)"
                  className="m-2 h-full w-[70%] border-2 border-black p-2"
                />
              </div>
            </div>
          </div>
          <div className="ml-2 flex h-[85%] w-full flex-col">
            <p className="mt-[4%] text-3xl font-bold">RX</p>
            <div className="flex w-[80%] flex-col justify-between">
              <div className="h-fit w-full">
                {prescriptionData.medicine.map((item, index) => {
                  return (
                    <div className="flex">
                      <p>{item.medicine}</p>
                      <p>{item.repeatitions}</p>
                      <p>{item.timing}</p>
                      <FaXmark />
                      <FaCheck />
                    </div>
                  );
                })}
              </div>
              <div className="flex h-fit w-full">
                <input
                  name="medicine"
                  className="h-11 w-[30%] border-2 border-[#DBDBDB] focus:outline-[#DBDBDB]"
                  list="medicine"
                  type="text"
                  placeholder="Select Medicine"
                  onChange={handleSave}
                />
                <datalist id="medicine">
                  {symptom?.map((item, index) => {
                    return <option key={index} value={item.name}></option>;
                  })}
                </datalist>
                <input
                  name="repeatitions"
                  className="h-11 w-[30%] border-2 border-[#DBDBDB] focus:outline-[#DBDBDB]"
                  list="repeatitions"
                  type="text"
                  placeholder="Select Repeatitions"
                  onChange={handleSave}
                />
                <datalist id="repeatitions">
                  <option value="Once Daily"></option>
                  <option value="Two Times Daily"></option>
                  <option value="Thrice Daily"></option>
                </datalist>
                <input
                  name="timing"
                  className="h-11 w-[20%] border-2 border-[#DBDBDB] focus:outline-[#DBDBDB]"
                  list="timings"
                  type="text"
                  placeholder="Select Timing"
                  onChange={handleSave}
                />
                <datalist id="timings">
                  <option value="Before Meal"></option>
                  <option value="After Meal"></option>
                </datalist>
                <button
                  className="h-10 w-[10%] bg-[#F36562] text-white"
                  onClick={async () => {
                    console.log(medicineList);
                    setPrescriptionData((prevData) => ({
                      ...prevData,
                      medicine: [...prevData.medicine, medicineList],
                    }));
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-1/5"></div>
      </div>
    </div>
  );
};

export default Prescriptiion;
