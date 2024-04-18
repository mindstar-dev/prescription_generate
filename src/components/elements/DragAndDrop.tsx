import React, { useState } from "react";
import { IoIosCloudUpload } from "react-icons/io";

const DragAndDrop: React.FunctionComponent = () => {
  const [files, setFiles] = useState<FileList | null>(null);

  const [dragging, setDragging] = useState(false);

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
    console.log(e.dataTransfer.files)
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
            <span>1234567</span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black">Name:</span>
            <span>Bal Majumdar</span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black">Age:</span>
            <span>56y</span>
          </span>
        </div>
        <div className="flex flex-col">
          <span className=" space-x-5">
            <span className="font-bold text-black">Date:</span>
            <span>10/05/2003</span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black">Time:</span>
            <span>10:30</span>
          </span>
        </div>
      </div>
      <div className=" m-[1%] grow space-y-[3%]">
        <p className="font-bold">Previous Prescription</p>
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
        {!files && (
          <div
            className={`h-[61%] w-full rounded-md border-2 border-dashed border-[#656565] ${dragging?"bg-[#d9d9d985]":"bg-[#d9d9d9]"} p-[1%]`}
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
