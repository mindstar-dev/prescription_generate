import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
interface PatientDetailsEditProps {
  patient_id: string;
}
const PatientDetailsEdit: React.FC<PatientDetailsEditProps> = (props) => {
  const router = useRouter();
  const [firstRender, setFirstRender] = useState(false);
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
  const { data, isError, isLoading } = api.patient.find_by_id.useQuery(
    props.patient_id,
    {
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  );
  useEffect(() => {
    // Check if there's valid data and update state
    if (data && !firstRender && !isLoading && !isError) {
      setFirstRender(true);
      setPatientData({
        first_name: data.first_name,
        age: data.age.toString(),
        contact_number: data.contact_number.toString() || "",
        gender: data.gender,
        last_name: data.last_name,
        patient_id: data.patient_id || "",
        email_id: data.email_id || "",
        address_line1: data.address_line1 || "",
        address_line2: data.address_line2 || "",
        city: data.city || "",
        country: data.country || "",
        fathers_name: data.fathers_name || "",
        husbands_name: data.husbands_name || "",
        pin_code: data.pin_code?.toString() || "",
        state: data.state || "",
      });
    }
  }, [data, isLoading, isError]);
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setPatientData({
      ...patientData,
      [name]: value,
    });
  };
  const register = api.patient.edit_details.useMutation({
    onError: (err, context) => {
      alert("Error occured");
      console.log(err.data);
    },
    onSuccess: () => {
      alert("Data updated successfully");
    },
  });
  const editPatient = () => {
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
            value={patientData.first_name}
          />
          <input
            type="text"
            placeholder="last name"
            className="h-full w-[44%] border-b border-black"
            name="last_name"
            onChange={handleInputChange}
            value={patientData.last_name}
          />
        </div>
        <div className="flex h-[5%] flex-row justify-between">
          <input
            type="number"
            placeholder="Contact No"
            className="h-full w-[44%] border-b border-black"
            name="contact_number"
            onChange={handleInputChange}
            value={patientData.contact_number}
          />
          <input
            type="text"
            placeholder="Email"
            className="h-full w-[44%] border-b border-black"
            name="email_id"
            onChange={handleInputChange}
            value={patientData.email_id}
          />
        </div>
        <div className="flex h-[5%] flex-row justify-between ">
          <div className="flex h-full w-[44%] border-b border-black">
            <p className="w-full">{data?.patient_id}</p>
            <p className="text-red-600">
              * Patient id can not be changed after its assign
            </p>
          </div>

          <select
            name="gender"
            id=""
            className="h-full w-[44%] border-b border-black"
            onChange={handleInputChange}
            value={patientData?.gender}
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
            value={patientData?.fathers_name as string}
          />
          <input
            type="text"
            placeholder="Father/Husband's Name "
            className="h-full w-[44%] border-b border-black"
            name="husbands_name"
            onChange={handleInputChange}
            value={patientData?.husbands_name as string}
          />
        </div>
        <div className="flex h-[5%] flex-row justify-between">
          <input
            type="number"
            placeholder="Age"
            className="h-full w-[44%] border-b border-black"
            name="age"
            onChange={handleInputChange}
            value={patientData?.age.toString()}
          />
        </div>
        <div className="text-3xl">Patient's Address</div>
        <div className="flex h-[5%] flex-col justify-between">
          <input
            type="text"
            placeholder="Address Line 1"
            className="h-full w-full border-b border-black"
            name="address_line1"
            onChange={handleInputChange}
            value={patientData?.address_line1 as string}
          />
        </div>
        <div className="flex h-[5%] flex-col justify-between">
          <input
            type="text"
            placeholder="Address Line 2"
            className="h-full w-full border-b border-black"
            name="address_line2"
            onChange={handleInputChange}
            value={patientData?.address_line2 as string}
          />
        </div>
        <div className="flex h-[5%] flex-row justify-between">
          <input
            type="text"
            placeholder="City"
            className="h-full w-[44%] border-b border-black"
            name="city"
            onChange={handleInputChange}
            value={patientData?.city as string}
          />
          <input
            type="text"
            placeholder="State"
            className="h-full w-[44%] border-b border-black"
            name="state"
            onChange={handleInputChange}
            value={patientData?.state as string}
          />
        </div>
        <div className="flex h-[5%] flex-row justify-between">
          <input
            type="text"
            placeholder="Postal Code"
            className="h-full w-[44%] border-b border-black"
            name="pin_code"
            onChange={handleInputChange}
            value={patientData?.pin_code?.toString()}
          />
          <input
            type="text"
            placeholder="Country"
            className="h-full w-[44%] border-b border-black"
            name="country"
            onChange={handleInputChange}
            value={patientData?.country as string}
          />
        </div>
        <div className="flex h-[4%] w-full justify-center space-x-8 text-white">
          {" "}
          <button
            className="h-full w-[103px] bg-[#3D4460]"
            onClick={() => {
              router.back();
            }}
          >
            Cancel
          </button>
          <button
            className="h-full w-[103px] bg-[#F36562]"
            onClick={(e) => {
              e.preventDefault();
              console.log(patientData);
              editPatient();
            }}
          >
            Save
          </button>{" "}
        </div>
      </form>
    </div>
  );
};

export default PatientDetailsEdit;
