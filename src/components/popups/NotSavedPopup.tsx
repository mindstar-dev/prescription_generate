import React from "react";
import checkImg from "../../../images/loading.png";
import Image from "next/image";
interface FinalizePopupProps {
  onYesClick: () => void;
  onNoClick: () => void;
}
const NotSavedPopup: React.FC<FinalizePopupProps> = (props) => {
  return (
    <div className="flex h-2/5 w-2/5 flex-col items-center justify-evenly bg-white">
      <p>
        Alert you have not saved this prescription yet do you wish to continue?
      </p>
      <div>
        <button
          className="mr-4 h-10 w-24 bg-[#F36562] text-white"
          onClick={props.onYesClick}
        >
          Yes
        </button>
        <button
          className="h-10 w-24 bg-[#3D4460] text-white"
          onClick={props.onNoClick}
        >
          No
        </button>
      </div>
    </div>
  );
};
export default NotSavedPopup;
