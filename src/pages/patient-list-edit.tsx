import React from 'react'
import PatientDetailsEdit from '~/components/elements/PatientDetailsEdit'
import CompounderPageTemplate from '~/components/templates/CompounderTemplate'

const patientlistedit:React.FunctionComponent = () => {
  return (
    <div>
      <CompounderPageTemplate activePage={''} doctorName={''}>
        <PatientDetailsEdit/>
      </CompounderPageTemplate>
    </div>
  )
}

export default patientlistedit
