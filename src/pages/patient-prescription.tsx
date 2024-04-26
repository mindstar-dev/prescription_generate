import React from "react";
import Prescriptiion from "~/components/elements/Prescriptiion";
import DoctorPageTemplate from "~/components/templates/DoctorPageTemplate";
import DoctorLogin from "./doctor-login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const PatientPrescription: React.FunctionComponent = () => {
  const router = useRouter();
  const { previous_prescription, patient_id } = router.query;
  const ses = useSession();
  if (ses.status === "loading") {
    return <div></div>;
  } else if (
    ses.status === "authenticated" &&
    ses.data.user.email === "doctor"
  ) {
    return (
      <DoctorPageTemplate activePage="appointments" doctorName="Doctor's Name">
        <Prescriptiion
          previous_prescription={previous_prescription as string}
        />
      </DoctorPageTemplate>
    );
  } else if (
    ses.status === "authenticated" &&
    ses.data.user.email === "compounder"
  ) {
    return (
      <>
        <p>Not authorised for this page</p>
      </>
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

export default PatientPrescription;
