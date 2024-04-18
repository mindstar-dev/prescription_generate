import React from 'react'
import DragAndDrop from '~/components/elements/DragAndDrop'
import CompounderPageTemplate from '~/components/templates/CompounderTemplate'

const compounderupload:React.FunctionComponent = () => {
  return (
    <div>
      <CompounderPageTemplate
        activePage=""
        doctorName="Doctor's Name"
      >
        <DragAndDrop/>
      </CompounderPageTemplate>
    </div>
  )
}

export default compounderupload
