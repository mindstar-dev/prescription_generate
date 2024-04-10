import React from 'react'
import Prescriptiion from '~/components/elements/Prescriptiion'
import MainPageTemplate from '~/components/templates/MainPageTemplate'

const patientprescription:React.FunctionComponent= () => {
  return (
    <div>
      <MainPageTemplate
        activePage="patient_registration"
        doctorName="Doctor's Name"
      >
        <Prescriptiion/>
      </MainPageTemplate>
    </div>
  )
}

export default patientprescription
