import React, { useEffect, useRef, useState } from "react";
import { IoIosCloudUpload } from "react-icons/io";
import { api } from "~/utils/api";
import supabase, { createClient } from "@supabase/supabase-js";
import { env } from "~/env";
import img from "../../../public/gojo.jpeg";
import PrescriptionView from "~/pages/prescription-view";
import Image from "next/image";
interface DragAndDropProps {
  patient_id: string;
}
const DragAndDrop: React.FunctionComponent<DragAndDropProps> = (props) => {
  const date = new Date();
  const [files, setFiles] = useState<FileList | null>(null);
  const [dragging, setDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedPrescription, setSelectedPrescription] = useState({
    patient: "",
    prescription: "",
  });
  useEffect(() => {
    if (props.patient_id) {
      setSelectedPrescription((prevState) => ({
        ...prevState,
        patient: props.patient_id,
      }));
    }
  }, [props.patient_id]);
  const ref = useRef<HTMLInputElement>(null);
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
    const droppedFiles = e.dataTransfer.files;

    if (droppedFiles.length > 0) {
      setFiles(droppedFiles); // Storing the file or files

      // Set preview URL for the first image file
      const file = droppedFiles[0];
      if (file?.type.startsWith("image/")) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        // Reset or handle non-image file type
        setPreviewUrl("");
        console.log("Dropped file is not an image");
      }
    }
  };
  const { data: previousPrescription } = api.prescription.get_all.useQuery();
  const { data: patient } = api.patient.get_all.useQuery();
  const saveFile = api.prescription.upload_test_report.useMutation({
    onError(error, variables, context) {
      alert(error.message);
    },
    onSuccess(data, variables, context) {
      alert("success");
    },
  });

  const handleFileUpload = async () => {
    const supabase_url = env.NEXT_PUBLIC_SUPABASE_URL;
    const supabase_anon_key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
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
      .upload(
        `${selectedPrescription.prescription}_${fileData.name}`,
        fileData,
        {
          cacheControl: "3600",
          upsert: false,
        },
      );

    if (error) {
      alert(error.message);
      console.error(error);
    } else {
      const filePathWithEncodedSpaces = data.path.replace(/ /g, "%20");
      const uploadedImageUrl = `${supabase_url}/storage/v1/object/public/test/${filePathWithEncodedSpaces}`;
      saveFile.mutate({
        date: date,
        prescription_id: selectedPrescription.prescription,
        test_report: uploadedImageUrl,
      });
      console.log(data.path);
      console.log(uploadedImageUrl);
    }
  };

  // Input change event handler
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Set the selected files when input changes
    const files = e.target.files;
    if (files) {
      const file = files[0];
      if (file?.type.startsWith("image/")) {
        setPreviewUrl(URL.createObjectURL(file)); // Create a URL for preview
      } else {
        // Optionally handle non-image file types or reset preview URL
        setPreviewUrl("");
        console.log("Selected file is not an image");
      }
    }
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
            <span>
              {
                patient?.find(
                  (item) => item.patient_id === selectedPrescription.patient,
                )?.patient_id
              }
            </span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black">Name:</span>
            <span>
              {
                patient?.find(
                  (item) => item.patient_id === selectedPrescription.patient,
                )?.first_name
              }
              -
              {
                patient?.find(
                  (item) => item.patient_id === selectedPrescription.patient,
                )?.last_name
              }
            </span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black">Age:</span>
            <span>
              {
                patient?.find(
                  (item) => item.patient_id === selectedPrescription.patient,
                )?.age
              }
              Y
            </span>
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
      <div className=" m-[1%] flex grow flex-col space-y-[3%]">
        <p className="font-bold">Previous Prescription</p>
        <div className="flex flex-row space-x-[2%] ">
          <select
            name=""
            id=""
            className="h-[42px] w-fit border border-[#DBDBDB] p-1"
            value={selectedPrescription.patient}
            onChange={(e) => {
              setSelectedPrescription({
                ...selectedPrescription,
                patient: e.target.value,
              });
            }}
          >
            <option value="">---select patient---</option>

            {patient?.map((item, index) => {
              return (
                <option value={item.patient_id} key={index}>
                  {`${item.patient_id}--[${item.first_name} ${item.last_name}]`}
                </option>
              );
            })}
          </select>
          <select
            name=""
            id=""
            className="h-[42px] w-fit border border-[#DBDBDB] p-1"
            onChange={(e) => {
              setSelectedPrescription({
                ...selectedPrescription,
                prescription: e.target.value,
              });
            }}
          >
            <option value="">---select prescription---</option>
            {previousPrescription?.map((item, index) => {
              if (item.patient_id === selectedPrescription.patient) {
                return (
                  <option value={item.prescription_id} key={index}>
                    {item.date.toLocaleDateString()}-
                    {item.date.toLocaleTimeString()}
                  </option>
                );
              }
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
            <p>Upload</p>
          </button>
        </div>
        <input
          type="file"
          onChange={handleFileInputChange}
          ref={ref}
          className="hidden"
        />
        {!files ? (
          <div
            className={`h-[61%] w-full rounded-md border-2 border-dashed border-[#656565] ${dragging ? "bg-[#d9d9d985]" : "bg-[#d9d9d9]"} p-[1%]`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => {
              if (ref.current) {
                ref.current.click();
              }
            }}
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
        ) : (
          <div className="flex self-center">
            <Image src={previewUrl} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DragAndDrop;
