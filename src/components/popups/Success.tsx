import React from "react";
import checkImg from "../../../images/check_1@3x.png";
import Image from "next/image";
interface SuccessPopupProps {
  message: string;
  onClick: () => void;
}
const SuccessPopup: React.FunctionComponent<SuccessPopupProps> = (props) => {
  return (
    <div className="flex h-2/5 w-2/5 flex-col items-center justify-evenly bg-white">
      <Image src={checkImg} alt="" className="h-24 w-24" />
      <p>{props.message}</p>
      <button
        className="h-10 w-24 bg-[#F36562] text-white"
        onClick={props.onClick}
      >
        Ok
      </button>
    </div>
  );
};

export default SuccessPopup;
