import React from 'react'
import PatientList from '~/components/tables/PatientList'
import MainPageTemplate from '~/components/templates/MainPageTemplate'

const PatientLists:React.FunctionComponent = () => {
  return (
    <div>
      <MainPageTemplate
        activePage="patient_registration"
        doctorName="Doctor's Name"
      >
        <PatientList/>
      </MainPageTemplate>
    </div>
  )
}

export default PatientLists
