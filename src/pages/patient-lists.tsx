import { useSession } from "next-auth/react";
import React from "react";
import PatientListTable from "~/components/tables/PatientList";
import CompounderPageTemplate from "~/components/templates/CompounderTemplate";
import DoctorPageTemplate from "~/components/templates/DoctorPageTemplate";
import DoctorLogin from "./doctor-login";

const PatientLists: React.FunctionComponent = () => {
  const ses = useSession();
  if (ses.status === "loading") {
    return <div></div>;
  } else if (
    ses.status === "authenticated" &&
    ses.data.user.email === "doctor"
  ) {
    return (
      <DoctorPageTemplate activePage="patient_list" doctorName="Doctor's Name">
        <PatientListTable />
      </DoctorPageTemplate>
    );
  } else if (
    ses.status === "authenticated" &&
    ses.data.user.email === "compounder"
  ) {
    return (
      <div>
        <CompounderPageTemplate activePage="patient_list" doctorName={""}>
          <PatientListTable />
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

export default PatientLists;
