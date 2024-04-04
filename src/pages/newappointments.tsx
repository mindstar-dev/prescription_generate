import React from 'react'
import NewAppointments from '~/components/tables/NewAppointments'
import MainPageTemplate from '~/components/templates/MainPageTemplate'

const newappointments:React.FunctionComponent = () => {
  return (
    <div>
      <MainPageTemplate
        activePage="patient_registration"
        doctorName="Doctor's Name"
      >
        <NewAppointments/>
      </MainPageTemplate>
    </div>
  )
}

export default newappointments
