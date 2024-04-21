import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import DragAndDrop from "~/components/elements/DragAndDrop";
import CompounderPageTemplate from "~/components/templates/CompounderTemplate";
import DoctorLogin from "./doctor-login";
import DoctorPageTemplate from "~/components/templates/DoctorPageTemplate";
import ViewReport from "~/components/elements/ViewReport";

const ReportView: React.FunctionComponent = () => {
  const router = useRouter();
  const { patient_id } = router.query;
  const ses = useSession();
  if (ses.status === "loading") {
    return <div></div>;
  } else if (
    ses.status === "authenticated" &&
    ses.data.user.email === "doctor"
  ) {
    return (
      <DoctorPageTemplate activePage="reports" doctorName="Doctor's Name">
        <ViewReport patient_id={patient_id as string} />
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

export default ReportView;
