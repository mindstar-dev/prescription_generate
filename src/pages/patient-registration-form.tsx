import { useSession } from "next-auth/react";
import React from "react";
import PatientRegistrattionFormComponent from "~/components/form/PatientRegistrattionForm";
import CompounderPageTemplate from "~/components/templates/CompounderTemplate";
import DoctorPageTemplate from "~/components/templates/DoctorPageTemplate";
import DoctorLogin from "./doctor-login";

const PatientRegistrationForm: React.FunctionComponent = () => {
  const ses = useSession();
  if (ses.status === "loading") {
    return <div></div>;
  } else if (
    ses.status === "authenticated" &&
    ses.data.user.email === "doctor"
  ) {
    return (
      <DoctorPageTemplate
        activePage="patient_registration"
        doctorName="Doctor's Name"
      >
        <PatientRegistrattionFormComponent />
      </DoctorPageTemplate>
    );
  } else if (
    ses.status === "authenticated" &&
    ses.data.user.email === "compounder"
  ) {
    return (
      <div>
        <CompounderPageTemplate
          activePage="patient_registration"
          doctorName={""}
        >
          <PatientRegistrattionFormComponent />
        </CompounderPageTemplate>
      </div>
    );
  } else {
    return (
      <>
        <main className="flex h-full w-full">
          <DoctorLogin />
        </main>
      </>
    );
  }
};

export default PatientRegistrationForm;
