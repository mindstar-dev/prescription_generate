import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Image from "next/image";
import img from "../../../images/medical-symbol 1.png";
interface pdfProps {
  patient:
    | {
        first_name: string;
        last_name: string;
        contact_number: bigint;
        email_id: string | null;
        patient_id: string;
        gender: string;
        fathers_name: string | null;
        husbands_name: string | null;
        age: string;
        address_line1: string | null;
        address_line2: string | null;
        city: string | null;
        state: string | null;
        pin_code: number | null;
        country: string | null;
      }
    | null
    | undefined;
  prescription_data: {
    patient_id: string;
    tests: string;
    symptom: string;
    bp: string;
    diagnosis: string;
    weight: string;
    note: string;
    medicine: {
      medicine: string;
      repeatitions: string;
      id: string;
    }[];
  };
  ref: React.RefObject<HTMLDivElement>;
}
const PrescipttionPopup: React.FC<pdfProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  const date = new Date();
  const handleGeneratePdf = async () => {
    if (!ref.current) {
      return;
    }

    // Increase the resolution of the captured canvas
    const scaleFactor = 4; // You can adjust this value for higher resolution
    const canvas = await html2canvas(ref.current, {
      scale: scaleFactor,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "px", "a4", true);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width / scaleFactor; // Adjusted width based on scale factor
    const imgHeight = canvas.height / scaleFactor; // Adjusted height based on scale factor
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;
    pdf.addImage(
      imgData,
      "PNG",
      imgX,
      imgY,
      imgWidth * ratio,
      imgHeight * ratio,
    );
    pdf.save(`${props.patient?.patient_id}_${date.toISOString()}.pdf`);
  };

  return (
    <div className="flex h-fit w-fit flex-col items-center justify-center">
      <button
        onClick={handleGeneratePdf}
        className="mb-4 h-8 w-fit min-w-16 self-end bg-[#F36562] px-2 text-white"
      >
        Download
      </button>
      <div
        className="flex h-[841px] w-[595px] flex-col  bg-white"
        id="pdfContainer"
        ref={ref}
      >
        <div className="flex h-[14%] w-full flex-row items-center justify-between bg-[#9AA0B9] px-[2rem]">
          <div className="h-[40%] w-[10%]">
            <Image src={img} className="h-full w-full text-white" alt="" />
          </div>
          <div className="flex h-[65%] w-fit flex-col justify-between text-white">
            <span className="whitespace-nowrap">Dr. Name Surname</span>
            <span className="whitespace-nowrap text-sm">Qualification</span>
            <span className="whitespace-nowrap text-sm">Address & Contact</span>
          </div>
        </div>
        <div className="flex h-fit w-full flex-row flex-wrap items-center justify-between bg-[#F0F0F0] px-[2rem]">
          <div className="flex h-full w-[25%] flex-col justify-end ">
            <div className="flex flex-row  whitespace-nowrap text-sm">
              <span className="mr-2 font-bold">P-ID: </span>
              <span>{props.patient?.patient_id}</span>
            </div>
            <div className="flex flex-row whitespace-nowrap text-sm">
              <span className="mr-2 font-bold">Name: </span>
              <span>
                {props.patient?.first_name} {props.patient?.last_name}
              </span>
            </div>
            <div className="flex flex-row  whitespace-nowrap text-sm">
              <span className="mb-4 mr-2 font-bold">Age: </span>
              <span>{props.patient?.age}</span>
            </div>
          </div>
          <div className="justify flex h-full w-[25%] flex-col ">
            <div className="flex flex-row space-x-[1rem] whitespace-nowrap text-sm">
              <span className="font-bold">Date:</span>
              <span>
                {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
              </span>
            </div>
            <div className="flex flex-row space-x-[1rem] whitespace-nowrap text-sm">
              <span className="font-bold">Time:</span>
              <span>
                {date.getHours()}:
                {date.getMinutes() < 10
                  ? `0${date.getMinutes()}`
                  : date.getMinutes()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-1 flex-row border-t-[.1rem] border-[#958E8E]">
          <div className="h-full w-[45%] space-y-[3rem] border-r-[.1rem] border-[#958E8E] p-[.5rem]">
            <div className="flex w-full  flex-row justify-between whitespace-nowrap">
              <span className="font-bold">Symptopms</span>
              <span className="">{props.prescription_data.symptom}</span>
            </div>
            <div className="flex flex-row justify-between  whitespace-nowrap">
              <span className="font-bold">Diagnosis</span>
              <span className="">{props.prescription_data.diagnosis}</span>
            </div>
            <div className="flex w-full flex-row justify-between whitespace-nowrap">
              <span className="font-bold">BP</span>
              <span className="">{props.prescription_data.bp}</span>
            </div>
            <div className="flex w-full flex-row justify-between whitespace-nowrap">
              <span className="font-bold">Weight</span>
              <span className="">{props.prescription_data.weight}KG</span>
            </div>
          </div>
          <div className="flex h-full w-[55%] flex-col px-[1rem]">
            <div className="flex h-fit w-full flex-col">
              <h2 className="text-lg font-bold">RX</h2>
              <div className="flex h-[25%] w-full flex-col ">
                {props.prescription_data.medicine.map((item, index) => {
                  return (
                    <div
                      className="flex w-[80%] flex-row justify-between"
                      key={index}
                    >
                      <span>{item.medicine}</span>
                      <span>{item.repeatitions}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex h-fit w-full flex-col">
              <h2 className="text-lg font-bold">Test To Do</h2>
              <div className="flex h-fit w-[80%] flex-col justify-between">
                {props.prescription_data.tests}
              </div>
            </div>
            <div className="flex h-fit w-full flex-col">
              <h2 className="text-lg font-bold">Note</h2>
              <div>{props.prescription_data.note}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescipttionPopup;
