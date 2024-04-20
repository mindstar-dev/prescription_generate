import React, { useState } from "react";
import { IoIosCloudUpload } from "react-icons/io";
import { api } from "~/utils/api";
import supabase, { createClient } from "@supabase/supabase-js";
import { env } from "~/env";
import img from "../../../public/gojo.jpeg";
interface DragAndDropProps {
  patient_id: string;
}
const DragAndDrop: React.FunctionComponent<DragAndDropProps> = (props) => {
  const date = new Date();
  const [files, setFiles] = useState<FileList | null>(null);

  const [dragging, setDragging] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState("");
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    // Handle dropped files
    setFiles(e.dataTransfer.files);
    console.log(e.dataTransfer.files);
  };
  const { data: previousPrescription } =
    api.prescription.get_by_patient_id.useQuery({
      patient_id: props.patient_id,
    });
  const { data: patient } = api.patient.find_by_id.useQuery(
    props.patient_id as string,
  );
  const saveFile = api.prescription.upload_test_report.useMutation({
    onError(error, variables, context) {
      alert(error.message);
    },
    onSuccess(data, variables, context) {
      alert("success");
    },
  });

  const handleFileUpload = async () => {
    const supabase_url = "https://eqaymhxmfqnbfxalgrui.supabase.co";
    const supabase_anon_key =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxYXltaHhtZnFuYmZ4YWxncnVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzMDc2MDQsImV4cCI6MjAyNzg4MzYwNH0.nVUgHv-EMU_M6lZJ6JJ8fp8G69AJ3_vLPVPslxLcXM4";
    const supabase = createClient(supabase_url, supabase_anon_key);

    // Check if files exist
    if (!files || files.length === 0) {
      alert("No file selected");
      return;
    }

    // Read the first selected file
    const fileData = files[0];
    if (!fileData) {
      console.error("File data is undefined");
      return;
    }

    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage
      .from("test")
      .upload(fileData.name, fileData, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      alert(error.message);
      console.error(error);
    } else {
      const filePathWithEncodedSpaces = data.path.replace(/ /g, "%20");
      const uploadedImageUrl = `${supabase_url}/storage/v1/object/public/test/${filePathWithEncodedSpaces}`;
      saveFile.mutate({
        date: date,
        prescription_id: selectedPrescription,
        test_report: uploadedImageUrl,
      });
      console.log(data.path);
      console.log(uploadedImageUrl);
    }
  };

  // Input change event handler
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Set the selected files when input changes
    setFiles(e.target.files);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-[15%] w-full items-center justify-center">
        <p className="text-[30px] font-medium">Upload Reports</p>
      </div>
      <div className="flex h-fit w-full flex-row justify-between bg-[#F0F0F0] p-[1%]">
        <div className="flex flex-col ">
          <span className=" space-x-5">
            <span className="font-bold text-black">P-ID:</span>
            <span>{patient?.patient_id}</span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black">Name:</span>
            <span>
              {patient?.first_name}-{patient?.last_name}
            </span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black">Age:</span>
            <span>{patient?.age}Y</span>
          </span>
        </div>
        {/* <div className="flex flex-col">
          <span className=" space-x-5">
            <span className="font-bold text-black">Date:</span>
            <span>10/05/2003</span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black">Time:</span>
            <span>10:30</span>
          </span>
        </div> */}
      </div>
      <div className=" m-[1%] grow space-y-[3%]">
        <p className="font-bold">Previous Prescription</p>
        <div className="flex flex-row space-x-[2%] ">
          <select
            name=""
            id=""
            className="h-[42px] w-fit border border-[#DBDBDB] p-1"
            onChange={(e) => {
              setSelectedPrescription(e.target.value);
            }}
          >
            {previousPrescription?.map((item, index) => {
              return (
                <option value={item.prescription_id}>
                  {item.date.toLocaleDateString()}-
                  {item.date.toLocaleTimeString()}
                </option>
              );
            })}
          </select>
          <button
            className="h-[42px] w-[103px] bg-[#F36562] text-white"
            onClick={(e) => {
              e.preventDefault();
              handleFileUpload();
              console.log(selectedPrescription);
            }}
          >
            <p>VIEW</p>
          </button>
        </div>
        <input type="file" onChange={handleFileInputChange} />
        {!files && (
          <div
            className={`h-[61%] w-full rounded-md border-2 border-dashed border-[#656565] ${dragging ? "bg-[#d9d9d985]" : "bg-[#d9d9d9]"} p-[1%]`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="h-[10%] w-full  border-b-2 border-[#656565]">
              <p>Upload Document</p>
            </div>
            <div className="h-[90%] w-full">
              <div className="flex h-full w-full flex-col items-center justify-center">
                <IoIosCloudUpload className="h-[82px] w-[76px]" />
                <span className="text-[22px]/[25.3px]">Drag & Drop</span>
                <span className="text-[#969696]">
                  Your Files Or Browse To Upload
                </span>
                <span className="text-[12px]/[13.8px]">
                  Only JPEG, PNG and PDF files with max size of 15MB
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DragAndDrop;
