import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import PrescriptionView from "~/components/elements/PrescriptionView";
import CompounderPageTemplate from "~/components/templates/CompounderTemplate";
import DoctorPageTemplate from "~/components/templates/DoctorPageTemplate";
import { api } from "~/utils/api";
import DoctorLogin from "./doctor-login";

const prescriptionview: React.FunctionComponent = () => {
  const router = useRouter();
  const { prescription_id, patient_id, template_id } = router.query;
  const ses = useSession();
  if (ses.status === "loading") {
    return <div></div>;
  } else if (
    ses.status === "authenticated" &&
    ses.data.user.email === "doctor"
  ) {
    return (
      <DoctorPageTemplate
        activePage="upload_reports"
        doctorName="Doctor's Name"
      >
        <PrescriptionView
          prescription_id={prescription_id as string}
          pateint_id={patient_id as string}
          template_id={template_id as string}
        />
      </DoctorPageTemplate>
    );
  } else if (
    ses.status === "authenticated" &&
    ses.data.user.email === "compounder"
  ) {
    return (
      <div>
        <CompounderPageTemplate activePage={""} doctorName={""}>
          <PrescriptionView
            prescription_id={prescription_id as string}
            pateint_id={patient_id as string}
            template_id={template_id as string}
          />
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

export default prescriptionview;
