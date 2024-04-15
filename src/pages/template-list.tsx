import React from 'react'
import Template from '~/components/tables/Template'
import CompounderPageTemplate from '~/components/templates/CompounderTemplate'

const templatelist:React.FunctionComponent = () => {
  return (
    <>
      <CompounderPageTemplate activePage={''} doctorName={''}>
        <Template/>
      </CompounderPageTemplate>
    </>
  )
}

export default templatelist
