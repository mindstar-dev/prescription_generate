import { css, Modal, styled } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import SuccessPopup from "../popups/Success";
import ErrorPopup from "../popups/Error";
import clsx from "clsx";

const PatientRegistrattionFormComponent: React.FunctionComponent = () => {
  const router = useRouter();
  const [patientIdExists, setPatientIdExists] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [errorPopup, setErrorPopup] = useState({
    state: false,
    type: "",
  });
  const { data, isError, isLoading } = api.patient.get_all.useQuery();
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
  const checkPatientId = () => {
    if (data?.find((item) => item.patient_id === patientData.patient_id)) {
      setPatientIdExists(true);
    } else {
      setPatientIdExists(false);
    }
  };
  useEffect(() => {
    if (data) {
      checkPatientId();
    }
  }, [data, patientData.patient_id]);
  const register = api.patient.register_patient.useMutation({
    onError: (err, context) => {
      setErrorPopup({
        state: true,
        type: "error",
      });
      console.log(err.data);
    },
    onSuccess: () => {
      setRegisterSuccess(true);
      setSuccessPopupOpen(true);
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
      setErrorPopup({
        state: true,
        type: "missing_data",
      });
    } else {
      register.mutate(patientData);
    }
  };
  if (isError || isLoading) {
    return <div></div>;
  }
  return (
    <div className="mx-[10%] my-[5%] h-[90%] w-[80%] ">
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={successPopupOpen}
        onClose={() => {
          if (registerSuccess) {
            setPatientData({
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
            setRegisterSuccess(false);
            setSuccessPopupOpen(false);
            return;
          }
          setSuccessPopupOpen(false);
        }}
        className="flex items-center justify-center"
      >
        <SuccessPopup
          onClick={() => {
            setPatientData({
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
            setSuccessPopupOpen(false);
          }}
          message="The Patient is Successfully registered"
        />
      </Modal>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={errorPopup.state}
        onClose={() => {
          setErrorPopup({ state: false, type: "" });
        }}
        className="flex items-center justify-center"
      >
        <ErrorPopup
          onClick={() => {
            setErrorPopup({ state: false, type: "" });
          }}
          message={`${errorPopup.type === "error" ? "Oops ! Something Went Wrong" : "Be Sure to fill all required fields"}`}
        />
      </Modal>
      <div className="flex w-full justify-center">Registration</div>
      <form action="" className="h-full w-full space-y-4">
        <div className="flex h-[5%] flex-row justify-between">
          <input
            type="text"
            placeholder="First Name*"
            className="h-full w-[44%] border-b border-black placeholder-red-500"
            name="first_name"
            required
            onChange={(e) => {
              const first_four_letters = e.target.value.slice(0, 4);
              const last_fout_numbets = patientData.contact_number
                .toString()
                .slice(0, 4);
              setPatientData({
                ...patientData,
                first_name: e.target.value,
                patient_id: `${first_four_letters}_${last_fout_numbets}`,
              });
            }}
            value={patientData.first_name}
          />
          <input
            type="text"
            placeholder="Last Name*"
            className="h-full w-[44%] border-b border-black placeholder-red-500"
            name="last_name"
            onChange={handleInputChange}
            value={patientData.last_name}
          />
        </div>
        <div className="flex h-[5%] flex-row justify-between">
          <input
            type="number"
            placeholder="Contact No*"
            className="h-full w-[44%] border-b border-black placeholder-red-500"
            name="contact_number"
            onChange={(e) => {
              const first_four_letters = patientData.first_name.slice(0, 4);
              const last_four_numbets = e.target.value.slice(0, 4);
              setPatientData({
                ...patientData,
                contact_number: e.target.value,
                patient_id: `${first_four_letters}_${last_four_numbets}`,
              });
            }}
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
        <div className="flex h-[5%] flex-row justify-between">
          <div className="flex w-[44%] flex-col">
            <input
              type="text"
              placeholder="Patient Id"
              className="h-full w-full border-b border-black"
              name="patient_id"
              value={patientData.patient_id}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
            {patientIdExists ? (
              <div className="text-red-500">
                *Patient_id alreay exists update it manually
              </div>
            ) : null}{" "}
          </div>
          <select
            name="gender"
            id=""
            className={`h-full w-[44%] border-b border-black ${patientData.gender === "" ? "text-red-500" : ""}`}
            onChange={handleInputChange}
            value={patientData.gender}
          >
            <option value="" className="text-black">
              ---Select Gender--- *
            </option>
            <option value="Male" className="text-black">
              Male
            </option>
            <option value="Female" className="text-black">
              Female
            </option>
          </select>
        </div>
        <div className="flex h-[5%] flex-row justify-between">
          <input
            type="text"
            placeholder="Father's Name "
            className="h-full w-[44%] border-b border-black"
            name="fathers_name"
            onChange={handleInputChange}
            value={patientData.fathers_name}
          />
          <input
            type="text"
            placeholder="Husband's Name "
            className="h-full w-[44%] border-b border-black"
            name="husbands_name"
            onChange={handleInputChange}
            value={patientData.husbands_name}
          />
        </div>
        <div className="flex h-[5%] flex-row justify-between">
          <input
            type="number"
            placeholder="Age*"
            className="h-full w-[44%] border-b border-black placeholder-red-500"
            name="age"
            onChange={handleInputChange}
            value={patientData.age}
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
            value={patientData.address_line1}
          />
        </div>
        <div className="flex h-[5%] flex-col justify-between">
          <input
            type="text"
            placeholder="Address Line 2"
            className="h-full w-full border-b border-black"
            name="address_line2"
            onChange={handleInputChange}
            value={patientData.address_line2}
          />
        </div>
        <div className="flex h-[5%] flex-row justify-between">
          <input
            type="text"
            placeholder="City"
            className="h-full w-[44%] border-b border-black"
            name="city"
            onChange={handleInputChange}
            value={patientData.city}
          />
          <input
            type="text"
            placeholder="State"
            className="h-full w-[44%] border-b border-black"
            name="state"
            onChange={handleInputChange}
            value={patientData.state}
          />
        </div>
        <div className="flex h-[5%] flex-row justify-between">
          <input
            type="text"
            placeholder="Postal Code"
            className="h-full w-[44%] border-b border-black"
            name="pin_code"
            onChange={handleInputChange}
            value={patientData.pin_code}
          />
          <input
            type="text"
            placeholder="Country"
            className="h-full w-[44%] border-b border-black"
            name="country"
            onChange={handleInputChange}
            value={patientData.country}
          />
        </div>
        <div className="flex h-[4%] w-full justify-center space-x-8 text-white">
          {" "}
          <button
            className="h-full w-[103px] bg-[#3D4460]"
            onClick={(e) => {
              e.preventDefault();
              console.log(patientData);
              console.log(patientIdExists);
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
