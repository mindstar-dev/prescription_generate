import React from 'react'
import PatientRegistrattionForm from '~/components/form/PatientRegistrattionForm';
import MainPageTemplate from '~/components/templates/MainPageTemplate';

const patientregistrationform:React.FunctionComponent = () => {
    return (
        <>
          <MainPageTemplate
            activePage="patient_registration"
            doctorName="Doctor's Name"
          >
            <PatientRegistrattionForm/>
          </MainPageTemplate>
        </>
      );
}

export default patientregistrationform
