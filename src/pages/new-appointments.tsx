import React from "react";
import NewAppointments from "~/components/tables/NewAppointments";
import DoctorPageTemplate from "~/components/templates/DoctorPageTemplate";

const newappointments: React.FunctionComponent = () => {
  return (
    <div>
      <DoctorPageTemplate
        activePage="patient_registration"
        doctorName="Doctor's Name"
      >
        <NewAppointments />
      </DoctorPageTemplate>
    </div>
  );
};

export default newappointments;
