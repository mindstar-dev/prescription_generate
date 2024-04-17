import React from 'react'
import PrescriptionView from '~/components/elements/PrescriptionView'
import CompounderPageTemplate from '~/components/templates/CompounderTemplate'

const prescriptionview:React.FunctionComponent = () => {
  return (
    <div>
      <CompounderPageTemplate activePage={''} doctorName={''}>
        <PrescriptionView/>
      </CompounderPageTemplate>
    </div>
  )
}

export default prescriptionview
