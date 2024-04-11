import { useSession } from "next-auth/react";
import React from "react";
import NewAppointments from "~/components/tables/NewAppointments";
import CompounderPageTemplate from "~/components/templates/CompounderTemplate";
import DoctorPageTemplate from "~/components/templates/DoctorPageTemplate";

const newappointments: React.FunctionComponent = () => {
  const ses = useSession();
  return (
    <div>
      {ses.data && ses.data.user.email === "doctor" ? (
        <DoctorPageTemplate
          activePage="appointments"
          doctorName="Doctor's Name"
        >
          <NewAppointments />
        </DoctorPageTemplate>
      ) : (
        <CompounderPageTemplate
          activePage="appointments"
          doctorName="Doctor's Name"
        >
          <NewAppointments />
        </CompounderPageTemplate>
      )}
    </div>
  );
};

export default newappointments;
