import { useSession } from "next-auth/react";
import React from "react";
import PatientList from "~/components/tables/PatientList";
import CompounderPageTemplate from "~/components/templates/CompounderTemplate";
import DoctorPageTemplate from "~/components/templates/DoctorPageTemplate";

const PatientLists: React.FunctionComponent = () => {
  const ses = useSession();

  return (
    <div>
      {ses.data && ses.data.user.email === "doctor" ? (
        <DoctorPageTemplate
          activePage="patient_list"
          doctorName="Doctor's Name"
        >
          <PatientList />
        </DoctorPageTemplate>
      ) : (
        <CompounderPageTemplate
          activePage="patient_list"
          doctorName="Doctor's Name"
        >
          <PatientList />
        </CompounderPageTemplate>
      )}
    </div>
  );
};

export default PatientLists;
