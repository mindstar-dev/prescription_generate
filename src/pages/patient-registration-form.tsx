import React from "react";
import PatientRegistrattionForm from "~/components/form/PatientRegistrattionForm";
import DoctorPageTemplate from "~/components/templates/DoctorPageTemplate";

const patientregistrationform: React.FunctionComponent = () => {
  return (
    <>
      <DoctorPageTemplate
        activePage="patient_registration"
        doctorName="Doctor's Name"
      >
        <PatientRegistrattionForm />
      </DoctorPageTemplate>
    </>
  );
};

export default patientregistrationform;
