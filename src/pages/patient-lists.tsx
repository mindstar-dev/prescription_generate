import React from "react";
import PatientList from "~/components/tables/PatientList";
import DoctorPageTemplate from "~/components/templates/DoctorPageTemplate";

const PatientLists: React.FunctionComponent = () => {
  return (
    <div>
      <DoctorPageTemplate
        activePage="patient_registration"
        doctorName="Doctor's Name"
      >
        <PatientList />
      </DoctorPageTemplate>
    </div>
  );
};

export default PatientLists;
