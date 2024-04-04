import * as React from "react";
import NewAppointments from "~/components/tables/NewAppointments";
import PatientList from "~/components/tables/PatientList";
import MainPageTemplate from "~/components/templates/MainPageTemplate";

const CompounderDashBoard: React.FunctionComponent = () => {
  return (
    <>
      <MainPageTemplate
        activePage="patient_registration"
        doctorName="Doctor's Name"
      >
        
      </MainPageTemplate>
    </>
  );
};

export default CompounderDashBoard;
