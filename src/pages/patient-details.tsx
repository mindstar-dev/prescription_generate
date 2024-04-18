import React from 'react'
import PatientDetails from '~/components/elements/PatientDetails'
import CompounderPageTemplate from '~/components/templates/CompounderTemplate'

const patientdetails:React.FunctionComponent = () => {
  return (
    <div>
      <CompounderPageTemplate activePage={''} doctorName={''}>
        <PatientDetails/>
      </CompounderPageTemplate>
    </div>
  )
}

export default patientdetails
