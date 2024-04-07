import * as React from "react";
import CompounderPageTemplate from "~/components/templates/CompounderTemplate";
import DoctorPageTemplate from "~/components/templates/DoctorPageTemplate";

const DoctorDashBoard: React.FunctionComponent = () => {
  return (
    <>
      <DoctorPageTemplate
        activePage=""
        doctorName="Doctor's Name"
      ></DoctorPageTemplate>
    </>
  );
};

export default DoctorDashBoard;
