import Image from "next/image";
import x from "/public/gojo.jpeg";
import y from "/public/favicon.ico";
import { Button, Modal } from "@mui/material";
import { FaPrint } from "react-icons/fa";
import { FaCopy } from "react-icons/fa6";
import React, { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { image } from "html2canvas/dist/types/css/types/image";
interface PrescriptionViewProps {
  prescription_id: string;
  pateint_id: string;
  template_id: string;
}
const PrescriptionView: React.FunctionComponent<PrescriptionViewProps> = (
  props,
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  let image = [{ imagesrc: "/favicon.ico" }, { imagesrc: "/gojo2.jpeg" }];

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const newX = e.clientX - startX + translateX;
    const newY = e.clientY - startY + translateY;
    setTranslateX(newX);
    setTranslateY(newY);
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const router = useRouter();

  const { data } = api.prescription.get_by_id.useQuery({
    prescription_id: props.prescription_id,
  });
  const { data: patientData } = api.patient.find_by_id.useQuery(
    props.pateint_id,
  );
  const { data: prescriptionData } =
    api.prescription.get_prescription_medicine_data.useQuery({
      prescription_id: props.prescription_id,
    });
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-fit w-full flex-row justify-between bg-[#F0F0F0] p-[1%]">
        <div className="flex flex-col ">
          <span className=" space-x-5">
            <span className="font-bold text-black">P-ID:</span>
            <span>{data?.patient_id}</span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black">Name:</span>
            <span>
              {patientData?.first_name}
              {patientData?.last_name}
            </span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black">Age:</span>
            <span>{patientData?.age}y</span>
          </span>
        </div>
        <div className="flex flex-col">
          <span className=" space-x-5">
            <span className="font-bold text-black">Date:</span>
            <span>{data?.date.toDateString()}</span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black">Time:</span>
            <span>
              {data?.date.getHours()}:
              {data?.date.getMinutes().toString().padStart(2, "0")}
            </span>
          </span>
        </div>
      </div>
      <div className="flex h-[80%] flex-1  flex-row p-[1%]">
        <div className="flex h-full w-[50%] flex-col space-y-[2%]  border-r border-gray-700">
          <div className="flex flex-row justify-end space-x-[2%] pr-[1%]">
            {/* <select
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
            </button> */}
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
          <div className="flex flex-row space-x-[4%]">
            <p className="font-bold">Symptoms:</p>
            <p>{data?.symptom}</p>
          </div>
          <div className="flex flex-row space-x-[4%]">
            <p className="font-bold">Diagonosis:</p>
            <p>{data?.diagnosis}</p>
          </div>
          <div className="flex flex-row space-x-[4%]">
            <p className="font-bold">BP:</p>
            <p>{data?.bp}</p>
          </div>
          <div className="flex flex-row space-x-[4%]">
            <p className="font-bold">Weight:</p>
            <p>{data?.weight}KG</p>
          </div>
          <div className="">
            <p className="mb-[2%] text-2xl font-bold">Rx</p>
            {prescriptionData?.map((item, index) => {
              return (
                <div className="ml-[4%] flex flex-row space-x-[3%]">
                  <p>{item.medicine}</p> <p>{item.repeatitions}</p>
                </div>
              );
            })}
          </div>
          <div className="flex flex-row space-x-[4%]">
            <p className="font-bold">Tests Todo:</p>
            {data?.tests}
          </div>
          <div className="flex flex-row space-x-[4%]">
            <p className="font-bold">Note:</p>
            <p className="text-[#7E7E7E]">{data?.note}</p>
          </div>
          <div className="flex w-full justify-end pr-[5%]">
            <button
              className="h-[42px] w-[103px] bg-[#F36562] text-white"
              onClick={() => {
                console.log(props.prescription_id);
                router.push({
                  pathname: "patient-prescription",
                  query: {
                    template_id: props.template_id,
                    patient_id: props.pateint_id,
                  },
                });
              }}
            >
              <p>Back</p>
            </button>
          </div>
        </div>
        <div className="flex h-full w-[50%] flex-col  items-center justify-center overflow-hidden">
          {/* <div className="mx-[2%] h-[10%] w-full">
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
          </div> */}
          <div className="h-[59%] w-[62%] overflow-hidden bg-black">
            <div className="h-full snap-y snap-mandatory overflow-x-hidden overflow-y-scroll">
              {image.map((item, index) => (
                <div
                  className="h-full w-full snap-center"
                  key={index}
                  onClick={() => handleImageClick(item.imagesrc)}
                >
                  <Image
                    src={item.imagesrc}
                    alt={""}
                    width={100} // Specify the actual width of the image
                    height={100}
                    className=" aspect-square h-full w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        className="flex h-full w-full items-center justify-center"
      >
        <div className="flex h-fit w-fit items-center justify-center">
          {selectedImage && (
            <div className="h-fit w-fit">
              <img
                src={selectedImage}
                alt=""
                className="aspect-square h-fit w-fit"
              />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default PrescriptionView;
