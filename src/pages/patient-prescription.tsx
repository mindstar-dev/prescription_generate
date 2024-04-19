import React from "react";
import Prescriptiion from "~/components/elements/Prescriptiion";
import DoctorPageTemplate from "~/components/templates/DoctorPageTemplate";

const patientprescription: React.FunctionComponent = () => {
  return (
    <div>
      <DoctorPageTemplate activePage="appointments" doctorName="Doctor's Name">
        <Prescriptiion />
      </DoctorPageTemplate>
    </div>
  );
};

export default patientprescription;
