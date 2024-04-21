import * as React from "react";
import logo from "../../../images/healthcare logo 2.png";
import patient_registration_icon from "../../../images/registration-form 1.png";
import appointments_icon from "../../../images/Assignment.png";
import patient_list_icon from "../../../images/User attributes.png";
import reports_icon from "../../../images/Group 69.png";
import upload_reports_icon from "../../../images/file 1.png";
import templates_icon from "../../../images/Dashboard.png";

import Image from "next/image";
import { FaSignOutAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
interface IProps {
  templateParams?: {
    title: string;
  };
  activePage:
    | "patient_registration"
    | "appointments"
    | "patient_list"
    | "reports"
    | "upload_reports"
    | "templates"
    | "";
  doctorName: string;
  children?: JSX.Element | JSX.Element[];
}
const DoctorPageTemplate: React.FunctionComponent<IProps> = (props) => {
  const router = useRouter();
  const a = useSession();
  return (
    <>
      <title></title>
      <main className="flex h-screen w-screen flex-nowrap">
        <div className="flex h-full w-1/5 flex-col justify-evenly bg-[#3D4460]">
          <Image
            src={logo}
            alt="Description of the image"
            className="h-[5%] w-4/5 self-center"
          />
          <div className="flex h-[70%] w-full flex-col">
            <div
              className={`flex h-[10%] w-full items-center rounded-[45px] ${props.activePage === "patient_registration" ? "bg-[#FCA19F]" : "bg-transparent"} cursor-pointer hover:bg-[#F36562]`}
              onClick={() => {
                router.push("patient-registration-form");
              }}
            >
              <Image
                src={patient_registration_icon}
                alt="Description of the image"
                className="ml-10 h-10 w-10"
              />
              <p className="text-lg font-medium text-white">
                Patient Registration
              </p>
            </div>
            <div
              className={`flex h-[10%] w-full items-center rounded-[45px] ${props.activePage === "appointments" ? "bg-[#FCA19F]" : "bg-transparent"} cursor-pointer hover:bg-[#F36562]`}
              onClick={() => {
                router.push("new-appointments");
              }}
            >
              <Image
                src={appointments_icon}
                alt="Description of the image"
                className="ml-10 h-10 w-10"
              />
              <p className="text-lg font-medium text-white">Appointments</p>
            </div>
            <div
              className={`flex h-[10%] w-full items-center rounded-[45px] ${props.activePage === "patient_list" ? "bg-[#FCA19F]" : "bg-transparent"} cursor-pointer hover:bg-[#F36562]`}
              onClick={() => {
                router.push("patient-lists");
              }}
            >
              <Image
                src={patient_list_icon}
                alt="Description of the image"
                className="ml-10 h-10 w-10"
              />
              <p className="text-lg font-medium text-white">Patient List</p>
            </div>
            <div
              className={`flex h-[10%] w-full items-center rounded-[45px] ${props.activePage === "reports" ? "bg-[#FCA19F]" : "bg-transparent"} cursor-pointer hover:bg-[#F36562]`}
              onClick={() => {
                router.push("report-view");
              }}
            >
              <Image
                src={reports_icon}
                alt="Description of the image"
                className="ml-10 h-10 w-10"
              />
              <p className="text-lg font-medium text-white">Reports</p>
            </div>
            <div
              className={`flex h-[10%] w-full items-center rounded-[45px] ${props.activePage === "upload_reports" ? "bg-[#FCA19F]" : "bg-transparent"} cursor-pointer hover:bg-[#F36562]`}
              onClick={() => {
                router.push("report-upload");
              }}
            >
              <Image
                src={upload_reports_icon}
                alt="Description of the image"
                className="ml-10 h-10 w-10"
              />
              <p className="text-lg font-medium text-white">Upload Reports</p>
            </div>
            <div
              className={`flex h-[10%] w-full items-center rounded-[45px] ${props.activePage === "templates" ? "bg-[#FCA19F]" : "bg-transparent"} cursor-pointer hover:bg-[#F36562]`}
              onClick={() => {
                router.push("template-list");
              }}
            >
              <Image
                src={templates_icon}
                alt="Description of the image"
                className="ml-10 h-10 w-10"
              />
              <p className="text-lg font-medium text-white">Templates</p>
            </div>
          </div>
          <div
            className="ml-10 flex cursor-pointer items-center"
            onClick={() => {
              signOut({ redirect: true, callbackUrl: "/doctor-login" });
            }}
          >
            <FaSignOutAlt className="mr-2 h-10 w-10 text-white" />
            <p className="text-lg font-medium text-white">Sign Out</p>
          </div>
        </div>
        <div className="flex h-screen w-4/5 flex-wrap items-center justify-center overflow-y-scroll">
          <div className="flex h-fit min-h-[95%] w-[95%] flex-col self-center rounded-md border-2 border-black">
            <div className="flex h-[10%] w-full items-center justify-end rounded-t-md border-black bg-[#9AA0B9]">
              <FaCircleUser className="mr-4 h-10 w-10 text-white" />
              <p className="mr-4 text-lg font-medium text-white">
                {props.doctorName}
              </p>
            </div>
            <div className="h-[90%] w-full">{props.children}</div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DoctorPageTemplate;
