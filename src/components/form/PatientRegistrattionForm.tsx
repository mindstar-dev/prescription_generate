import React, { useState } from "react";
import { api } from "~/utils/api";

const PatientRegistrattionFormComponent: React.FunctionComponent = () => {
  const [patientData, setPatientData] = useState({
    first_name: "",
    age: "",
    contact_number: "",
    gender: "",
    last_name: "",
    patient_id: "",
    email_id: "",
    address_line1: "",
    address_line2: "",
    city: "",
    country: "",
    fathers_name: "",
    husbands_name: "",
    pin_code: "",
    state: "",
  });
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setPatientData({
      ...patientData,
      [name]: value,
    });
  };
  const register = api.patient.register_patient.useMutation({
    onError: (err, context) => {
      alert("Error occured");
      console.log(err.data);
    },
    onSuccess: () => {
      alert("Data added successfully");
    },
  });
  const registerPatient = () => {
    if (
      patientData.first_name === "" ||
      patientData.last_name === "" ||
      patientData.contact_number === "" ||
      patientData.gender === "" ||
      patientData.age === "" ||
      patientData.patient_id === ""
    ) {
      alert("Be sure to fill all required details");
    } else {
      register.mutate(patientData);
    }
  };
  return (
    <div className="mx-[10%] my-[5%] h-[90%] w-[80%] ">
      <div className="flex w-full justify-center">Registration</div>
      <form action="" className="h-full w-full space-y-4">
        <div className="flex h-[5%] flex-row justify-between">
          <input
            type="text"
            placeholder="first name"
            className="h-full w-[44%] border-b border-black"
            name="first_name"
            required
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="last name"
            className="h-full w-[44%] border-b border-black"
            name="last_name"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex h-[5%] flex-row justify-between">
          <input
            type="number"
            placeholder="Contact No"
            className="h-full w-[44%] border-b border-black"
            name="contact_number"
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Email"
            className="h-full w-[44%] border-b border-black"
            name="email_id"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex h-[5%] flex-row justify-between">
          <input
            type="text"
            placeholder="Patient Id"
            className="h-full w-[44%] border-b border-black"
            name="patient_id"
            onChange={handleInputChange}
          />
          <select
            name="gender"
            id=""
            className="h-full w-[44%] border-b border-black"
            onChange={handleInputChange}
          >
            <option value="">---Select Gender---</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="flex h-[5%] flex-row justify-between">
          <input
            type="text"
            placeholder="Father/Husband's Name "
            className="h-full w-[44%] border-b border-black"
            name="fathers_name"
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Father/Husband's Name "
            className="h-full w-[44%] border-b border-black"
            name="husbands_name"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex h-[5%] flex-row justify-between">
          <input
            type="number"
            placeholder="Age"
            className="h-full w-[44%] border-b border-black"
            name="age"
            onChange={handleInputChange}
          />
        </div>
        <div className="text-3xl">Patient&apos;s Address</div>
        <div className="flex h-[5%] flex-col justify-between">
          <input
            type="text"
            placeholder="Address Line 1"
            className="h-full w-full border-b border-black"
            name="address_line1"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex h-[5%] flex-col justify-between">
          <input
            type="text"
            placeholder="Address Line 2"
            className="h-full w-full border-b border-black"
            name="address_line2"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex h-[5%] flex-row justify-between">
          <input
            type="text"
            placeholder="City"
            className="h-full w-[44%] border-b border-black"
            name="city"
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="State"
            className="h-full w-[44%] border-b border-black"
            name="state"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex h-[5%] flex-row justify-between">
          <input
            type="text"
            placeholder="Postal Code"
            className="h-full w-[44%] border-b border-black"
            name="pin_code"
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Country"
            className="h-full w-[44%] border-b border-black"
            name="country"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex h-[4%] w-full justify-center space-x-8 text-white">
          {" "}
          <button className="h-full w-[103px] bg-[#3D4460]">Cancle</button>
          <button
            className="h-full w-[103px] bg-[#F36562]"
            onClick={(e) => {
              e.preventDefault();
              console.log(patientData);
              registerPatient();
            }}
          >
            Save
          </button>{" "}
        </div>
      </form>
    </div>
  );
};

export default PatientRegistrattionFormComponent;
