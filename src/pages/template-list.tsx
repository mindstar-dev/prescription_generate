import { useSession } from "next-auth/react";
import React from "react";
import Template from "~/components/tables/Template";
import CompounderPageTemplate from "~/components/templates/CompounderTemplate";
import DoctorPageTemplate from "~/components/templates/DoctorPageTemplate";

const templatelist: React.FunctionComponent = () => {
  const ses = useSession();

  return (
    <>
      {ses.data && ses.data.user.email === "doctor" ? (
        <DoctorPageTemplate activePage="templates" doctorName="Doctor's Name">
          <Template />
        </DoctorPageTemplate>
      ) : (
        <CompounderPageTemplate activePage="" doctorName="Doctor's Name">
          <Template />
        </CompounderPageTemplate>
      )}
    </>
  );
};

export default templatelist;
