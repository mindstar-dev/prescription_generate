import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { FaPen, FaPrint } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { OutlinedInput, Select, TextField } from "@mui/material";
import { api } from "~/utils/api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const Prescriptiion: React.FunctionComponent = () => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [inPrint, setInPrint] = useState(false);
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  const { patient_id, template_id } = router.query;
  const date = new Date();
  const { data: patient } = api.patient.find_by_id.useQuery(
    patient_id as string,
  );
  const {
    data: template_data,
    isError,
    isLoading,
  } = api.template.template_data_by_id.useQuery({
    template_id: template_id as string,
  });

  const [prescriptionData, setPrescriptionData] = useState({
    patient_id: patient_id as string,
    date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
    tests: "",
    symptom: "",
    bp: "",
    diagnosis: "",
    weight: "",
    note: "",
    medicine: [] as {
      medicine: string;
      repeatitions: string;
      id: string;
    }[],
  });
  const [medicineList, setMedicineList] = useState({
    medicine: "",
    repeatitions: "",
    id: "",
  });
  useEffect(() => {
    if (!isLoading && !isError && template_data && !initialFetchDone) {
      // Perform your desired operation here
      console.log("Data successfully fetched:", template_data);
      // You can perform any operation you want with the fetched data here
      const arr: {
        id: string;
        medicine: string;
        repeatitions: string;
      }[] = [];
      template_data.forEach((item) => {
        const newItem = {
          id: date.toISOString(),
          medicine: item.medicine,
          repeatitions: item.doseage, // Renaming 'doseage' to 'repetitions'
        };
        arr.push(newItem);
      });
      setPrescriptionData({
        ...prescriptionData,
        medicine: arr,
      });
      // Set initial fetch done to true
      setInitialFetchDone(true);
    }
  }, [template_data, isLoading, isError, initialFetchDone]);
  const handleMedicineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMedicineList({
      ...medicineList,
      [name]: value,
      id: date.toTimeString(),
    });
  };

  const handleGeneratePdf = async () => {
    setInPrint(true);

    // const doc = new jsPDF({
    //   format: [1920, 1080],
    //   unit: "px",
    //   orientation: "portrait",
    //   compress: false,
    //   precision: 100,
    // });

    // doc.html(ref.current, {
    //   callback: () => {
    //     doc.output("dataurlnewwindow");
    //   },
    // });
    if (!ref.current) {
      return;
    }
    await new Promise((resolve) => {
      setTimeout(resolve, 1000); // 1000 milliseconds = 1 second
    });
    html2canvas(ref.current).then((canvas) => {
      if (ref.current) {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "px", "a4", true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = 2480;
        const imgHeight = 3508;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;
        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio,
        );
        pdf.output("dataurlnewwindow");
      } else {
        alert("error in generating pdf");
      }
    });
  };

  const { data: medicine } = api.medicine.get_all.useQuery();
  if (isError || isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex h-full w-full flex-col" ref={ref} id="pdfContainer">
      <div className="flex h-fit w-full flex-row justify-between bg-[#F0F0F0] p-[1%]">
        <div className="flex flex-col ">
          <span className=" space-x-5">
            <span className="font-bold text-black">P-ID:</span>
            <span>{patient?.patient_id}</span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black">Name:</span>
            <span>
              {patient?.first_name} {patient?.last_name}
            </span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black">Age:</span>
            <span>{patient?.age}y</span>
          </span>
        </div>
        <div className="flex flex-col">
          <span className=" space-x-5">
            <span className="font-bold text-black">Date:</span>
            <span>
              {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
            </span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black">Time:</span>
            <span>
              {date.getHours()}:
              {date.getMinutes() < 10
                ? `0${date.getMinutes()}`
                : date.getMinutes()}
            </span>
          </span>
        </div>
      </div>
      <div className="flex h-full w-full">
        <div className="my-2 flex h-[99%] w-4/5 flex-col self-center border-r-2 border-[#958E8E]">
          <div className="flex h-[15%] w-full flex-row ">
            {inPrint ? (
              <div className="flex h-full w-[85%] flex-col justify-evenly">
                <div className="flex h-[45%] w-[85%] ">
                  <div className="ml-2 flex h-full w-1/2 items-center justify-between ">
                    <p className="w-[20%] text-lg font-bold">Symptoms</p>
                    <p className="m-2 flex h-full w-[70%]  items-center justify-center p-2">
                      {prescriptionData.symptom}
                    </p>
                  </div>
                  <div className="ml-2 flex h-full w-1/2 items-center justify-between ">
                    <p className="w-[20%] text-lg font-bold">BP</p>
                    <p className="m-2 flex h-full w-[70%]  items-center justify-center p-2">
                      {prescriptionData.bp}
                    </p>
                  </div>
                </div>
                <div className="flex h-[45%] w-[85%] ">
                  <div className="ml-2 flex h-full w-1/2 items-center justify-between ">
                    <p className="w-[20%] text-lg font-bold">Diagnosis</p>
                    <p className="m-2 flex h-full w-[70%]  items-center justify-center p-2">
                      {prescriptionData.diagnosis}
                    </p>
                  </div>
                  <div className="ml-2 flex h-full w-1/2 items-center justify-between ">
                    <p className="w-[20%] text-lg font-bold">Weight</p>
                    <p className="m-2 flex h-full w-[70%]  items-center justify-center p-2">
                      {prescriptionData.weight}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full w-[85%] flex-col justify-evenly">
                <div className="flex h-[45%] w-[85%] ">
                  <div className="ml-2 flex h-full w-1/2 items-center justify-between ">
                    <p className="w-[20%] text-lg font-bold">Symptoms</p>
                    <input
                      type="text"
                      placeholder="Enter Symptoms"
                      className="m-2 h-full w-[70%] border-2 border-black p-2"
                      onChange={(e) => {
                        setPrescriptionData({
                          ...prescriptionData,
                          symptom: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="ml-2 flex h-full w-1/2 items-center justify-between ">
                    <p className="w-[20%] text-lg font-bold">BP</p>
                    <input
                      type="text"
                      placeholder="Enter BP"
                      className="m-2 h-full w-[70%] border-2 border-black p-2"
                      onChange={(e) => {
                        setPrescriptionData({
                          ...prescriptionData,
                          bp: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex h-[45%] w-[85%] ">
                  <div className="ml-2 flex h-full w-1/2 items-center justify-between ">
                    <p className="w-[20%] text-lg font-bold">Diagnosis</p>
                    <input
                      type="text"
                      placeholder="Enter Diagnosis"
                      className="m-2 h-full w-[70%] border-2 border-black p-2"
                      onChange={(e) => {
                        setPrescriptionData({
                          ...prescriptionData,
                          diagnosis: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="ml-2 flex h-full w-1/2 items-center justify-between ">
                    <p className="w-[20%] text-lg font-bold">Weight</p>
                    <input
                      type="text"
                      placeholder="Enter Weight (in Kg)"
                      className="m-2 h-full w-[70%] border-2 border-black p-2"
                      onChange={(e) => {
                        setPrescriptionData({
                          ...prescriptionData,
                          weight: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="h-full w-[15%]">
              {inPrint ? null : (
                <div className="flex w-1/2 cursor-pointer flex-col">
                  <FaPrint
                    className="h-8 w-8 text-[#7E7E7E]"
                    onClick={() => {
                      handleGeneratePdf();
                      console.log(template_id, patient_id);
                    }}
                  />

                  <p>Print</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex h-[85%] w-full flex-col px-2">
            <div className="flex h-full w-[80%] flex-col">
              <div className="h-fit w-full">
                <p className="mt-[4%] text-3xl font-bold">RX</p>
                {prescriptionData.medicine.map((item, index) => {
                  return (
                    <div className="my-2 flex w-3/5 items-center justify-between text-xl">
                      <p className="min-w-1/4 max-w-fit ">{item.medicine}</p>
                      <p className="w-1/4">{item.repeatitions}</p>
                      {inPrint ? null : (
                        <FaPen
                          className="h-4 w-4 text-[#4690C7]"
                          onClick={() => {
                            const element = prescriptionData.medicine.find(
                              (ele) =>
                                ele.id === item.id &&
                                ele.medicine === item.medicine &&
                                ele.repeatitions === item.repeatitions,
                            );
                            element ? setMedicineList(element) : null;
                            const updatedMedicineList =
                              prescriptionData.medicine.filter(
                                (ele) =>
                                  ele.id !== item.id ||
                                  ele.medicine !== item.medicine ||
                                  ele.repeatitions !== item.repeatitions,
                              );
                            setPrescriptionData({
                              ...prescriptionData,
                              medicine: updatedMedicineList,
                            });
                          }}
                        />
                      )}
                      {inPrint ? null : (
                        <FaXmark
                          className="h-6 w-6 text-[#E43030]"
                          onClick={() => {
                            const updatedMedicineList =
                              prescriptionData.medicine.filter(
                                (ele) =>
                                  ele.id !== item.id ||
                                  ele.medicine !== item.medicine ||
                                  ele.repeatitions !== item.repeatitions,
                              );
                            setPrescriptionData({
                              ...prescriptionData,
                              medicine: updatedMedicineList,
                            });
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              {inPrint ? null : (
                <div className="mt-[2%] flex h-fit w-full justify-evenly">
                  <input
                    name="medicine"
                    className="h-11 w-[30%] border-2 border-[#DBDBDB] focus:outline-[#DBDBDB]"
                    list="medicine"
                    type="text"
                    placeholder="Select Medicine"
                    onChange={handleMedicineChange}
                    value={medicineList.medicine}
                  />
                  <datalist id="medicine">
                    {medicine?.map((item, index) => {
                      return <option key={index} value={item.name}></option>;
                    })}
                  </datalist>
                  <input
                    name="repeatitions"
                    className="h-11 w-[30%] border-2 border-[#DBDBDB] focus:outline-[#DBDBDB]"
                    list="repeatitions"
                    type="text"
                    placeholder="Select Repeatitions"
                    onChange={handleMedicineChange}
                    value={medicineList.repeatitions}
                  />
                  <datalist id="repeatitions">
                    <option value="OD BM">OD BM</option>
                    <option value="OD AM">OD AM</option>
                    <option value="BD AM">BD AM</option>
                    <option value="BD BM">BD BM</option>
                    <option value="TD BM">TD BM</option>
                    <option value="TD AM">TD AM</option>
                  </datalist>

                  <button
                    className="h-10 w-[10%] bg-[#F36562] text-white"
                    onClick={() => {
                      console.log(medicineList);
                      if (
                        medicineList.medicine === "" ||
                        medicineList.repeatitions === ""
                      ) {
                        alert("medicine name or repeatation cant be empty");
                        return;
                      }
                      setPrescriptionData((prevData) => ({
                        ...prevData,
                        medicine: [...prevData.medicine, medicineList],
                      }));
                      setMedicineList({
                        medicine: "",
                        repeatitions: "",
                        id: "",
                      });
                    }}
                  >
                    Save
                  </button>
                </div>
              )}
              {inPrint ? (
                <div className="mt-4 flex h-fit w-4/5 items-center justify-between">
                  <p className="mr-4 block min-w-32 max-w-fit text-xl font-bold">
                    Tests To do
                  </p>
                  <p className="flex items-center justify-center">
                    {prescriptionData.tests}
                  </p>
                </div>
              ) : (
                <div className="mt-4 flex h-fit w-4/5 items-center justify-between">
                  <p className="w-32 text-xl font-bold">Tests To do</p>
                  <TextField
                    id="outlined-multiline-flexible"
                    multiline
                    maxRows={4}
                    className="min-w-0 flex-grow"
                    onChange={(e) => {
                      setPrescriptionData({
                        ...prescriptionData,
                        tests: e.target.value,
                      });
                    }}
                  />
                </div>
              )}
              {inPrint ? (
                <div className="mt-4 flex h-fit w-4/5 items-center justify-between">
                  <p className="mr-4 block min-w-32 max-w-fit text-xl font-bold">
                    Notes
                  </p>
                  <p className="flex items-center justify-center">
                    {prescriptionData.note}
                  </p>
                </div>
              ) : (
                <div className="mt-4 flex h-fit w-4/5 items-center justify-between">
                  <p className="w-32 text-xl font-bold">Notes</p>
                  <TextField
                    id="outlined-multiline-static"
                    label="Notes"
                    multiline
                    rows={4}
                    className="min-w-0 flex-grow"
                    onChange={(e) => {
                      setPrescriptionData({
                        ...prescriptionData,
                        note: e.target.value,
                      });
                    }}
                  />
                </div>
              )}
            </div>
            <div className=" flex h-1/5 w-full flex-wrap justify-between border-t-2 border-[#958E8E]">
              <div className="mt-2 flex h-full w-1/2 flex-col justify-evenly">
                <p className="text-lg font-bold">Previous Presctiption</p>
                <div className="flex w-full items-center justify-between">
                  <select className="mr-2 h-12 w-[75%] border-2 border-[#958E8E]"></select>
                  <button className="h-12 w-[20%] min-w-[20%] bg-[#F36562] font-semibold text-white">
                    View
                  </button>
                </div>
              </div>
              <div className="ml-4 mt-2 flex h-full w-[45%] flex-col justify-evenly">
                <p className="text-lg font-bold">Test Procedures & Reports</p>
                <div className="flex w-full items-center justify-between">
                  <select className="mr-2 h-12 w-[75%] border-2 border-[#958E8E]"></select>
                  <button className="h-12 w-[20%] min-w-[20%] bg-[#F36562] font-semibold text-white">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-1/5"></div>
      </div>
    </div>
  );
};

export default Prescriptiion;

const PrintComponent: React.FC = () => {
  return <div></div>;
};
