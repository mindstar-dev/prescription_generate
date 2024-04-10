import { useSession } from "next-auth/react";
import React from "react";
import PatientRegistrattionForm from "~/components/form/PatientRegistrattionForm";
import CompounderPageTemplate from "~/components/templates/CompounderTemplate";
import DoctorPageTemplate from "~/components/templates/DoctorPageTemplate";

const patientregistrationform: React.FunctionComponent = () => {
  const ses = useSession();
  return (
    <>
      {ses.data && ses.data.user.email === "doctor" ? (
        <DoctorPageTemplate
          activePage="patient_registration"
          doctorName="Doctor's Name"
        >
          <PatientRegistrattionForm />
        </DoctorPageTemplate>
      ) : (
        <CompounderPageTemplate
          activePage="patient_registration"
          doctorName="Doctor's Name"
        >
          <PatientRegistrattionForm />
        </CompounderPageTemplate>
      )}
    </>
  );
};

export default patientregistrationform;
