import React, { useState } from "react";

const Prescriptiion: React.FunctionComponent = () => {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [currentSymptoms, setCurrentSymptoms] = useState<string>("");
  const [diagonosis, setDiagonosis] = useState<string[]>([]);
  const [currentDiagonosis, setCurrentDiagonosis] = useState<string>("");
  const [tests, setTest] = useState<string[]>([]);
  const [currentTest, setCurrentTest] = useState<string>("");
  const [bp, setBP] = useState<string>();
  const [savebp, setSavebp] = useState<string>();
  const [savedbp, setSavedBP] = useState(false);
  const [weight, setWeight] = useState<string>();
  const [saveweight, setSaveWeight] = useState<string>();
  const [savedweight, setSavedWeight] = useState(false);
  const [medicineSearch, setMedicineSearch] = useState<string>("");
  const meds = [
    "Acetaminophen",
    "Adderall",
    "Amitriptyline",
    "Amlodipine",
    "Amoxicillin",
    "Ativan",
    "Atorvastatin",
    "Azithromycin",
    "Benzonatate",
    "Brilinta",
    "Bunavail",
    "Buprenorphine",
    "Cephalexin",
    "Ciprofloxacin",
    "Citalopram",
    "Clindamycin",
    "Clonazepam",
    "Cyclobenzaprine",
  ];
  const template = ["fever", "mathabatha", "vallagena", "takanei", "single"];

  const handelBPsave = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBP(e.target.value);
  };
  const handelWEIGHTsave = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  const handelMedicineSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMedicineSearch(e.target.value);
  };

  const handelSaveBP = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSavedBP(true);
    setSavebp(bp);
  };
  const handelSaveWEIGHT = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSavedWeight(true);
    setSaveWeight(weight);
  };

  const handleSymptomsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSymptoms(e.target.value);
  };
  const handleDiagonosisChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDiagonosis(e.target.value);
  };
  const handleTestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTest(e.target.value);
  };

  const handleAddMoreSymptoms = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentSymptoms.trim() !== "") {
      setSymptoms([...symptoms, currentSymptoms]);
      setCurrentSymptoms("");
    }
  };
  const handleAddMoreDiagonosis = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentDiagonosis.trim() !== "") {
      setDiagonosis([...diagonosis, currentDiagonosis]);
      setCurrentDiagonosis("");
    }
  };
  const handleAddMoreTest = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentTest.trim() !== "") {
      setTest([...tests, currentTest]);
      setCurrentTest("");
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-fit w-full flex-row justify-between bg-[#F0F0F0] p-[1%]">
        <div className="flex flex-col ">
          <span className=" space-x-5">
            <span className="font-bold text-black">P-ID:</span>
            <span>12345_raj</span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black">Name:</span>
            <span>Raj Sharma</span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black">Age:</span>
            <span>65y</span>
          </span>
        </div>
        <div className="flex flex-col">
          <span className=" space-x-5">
            <span className="font-bold text-black">Date:</span>
            <span>21-06-2003</span>
          </span>
          <span className=" space-x-5">
            <span className="font-bold text-black">Time:</span>
            <span>13:00</span>
          </span>
        </div>
      </div>
      <div className="flex w-full grow flex-row">
        <div className="h-full w-[80%] border-r border-[#958E8E] ">
          <div className="h-[90%] w-full overflow-x-hidden overflow-y-scroll">
            <form action="" className="m-[1%] flex flex-col space-y-[1%]">
              <div className="flex flex-row space-x-[4%]">
                <div className="flex flex-row space-x-[1%]">
                  <p className="font-bold">Symptoms</p>{" "}
                  <div className="flex flex-col">
                    <input
                      type="text"
                      className="mr-2 border border-gray-300 p-[1%]"
                      value={currentSymptoms}
                      onChange={handleSymptomsChange}
                    />
                    {symptoms.map((symptom, symptomindex) => (
                      <div key={symptomindex}>{symptom}</div>
                    ))}
                  </div>
                  <button
                    className=" self-start"
                    onClick={handleAddMoreSymptoms}
                  >
                    <p className="text-[#F36562]">Add More</p>
                  </button>
                </div>
                <div className="flex flex-row space-x-3">
                  <div className="flex flex-row space-x-3">
                    <p className="font-bold">BP</p>
                    <div>
                      {savedbp ? (
                        ""
                      ) : (
                        <input
                          type="text"
                          className="mr-2 border border-gray-300 p-[1%]"
                          value={bp}
                          onChange={handelBPsave}
                        />
                      )}
                      {savebp}
                    </div>
                  </div>
                  {savedbp ? (
                    <button className="self-start">
                      <p>edit</p>
                    </button>
                  ) : (
                    <button className="self-start" onClick={handelSaveBP}>
                      <p>Save</p>
                    </button>
                  )}
                </div>
              </div>
              <div className="flex flex-row space-x-[4%]">
                <div className="flex flex-row space-x-[1%]">
                  <p className="font-bold">Diagonosis</p>{" "}
                  <div className="flex flex-col">
                    <input
                      type="text"
                      className="mr-2 border border-gray-300 p-[1%]"
                      value={currentDiagonosis}
                      onChange={handleDiagonosisChange}
                    />
                    {diagonosis.map((diagonosis, diagonosisindex) => (
                      <div key={diagonosisindex}>{diagonosis}</div>
                    ))}
                  </div>
                  <button
                    className=" self-start"
                    onClick={handleAddMoreDiagonosis}
                  >
                    <p className="text-[#F36562]">Add More</p>
                  </button>
                </div>
                <div className="flex flex-row space-x-3">
                  <div className="flex flex-row space-x-3">
                    <p className="font-bold">Weight</p>
                    <div>
                      {savedweight ? (
                        ""
                      ) : (
                        <input
                          type="number"
                          className="mr-2 border border-gray-300 p-[1%]"
                          value={bp}
                          onChange={handelWEIGHTsave}
                        />
                      )}
                      {savedweight ? `${saveweight}kg` : ""}
                    </div>
                  </div>
                  {savedweight ? (
                    <button className="self-start">
                      <p>edit</p>
                    </button>
                  ) : (
                    <button className="self-start" onClick={handelSaveWEIGHT}>
                      <p>Save</p>
                    </button>
                  )}
                </div>
              </div>
              <div className="flex h-fit w-full flex-col p-[1%]">
                <p className="font-bold">Rx</p>
                <div className="flex flex-row ">
                  <div className="flex flex-col">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="mr-2 h-11 border border-gray-300 p-2"
                      value={medicineSearch}
                      onChange={handelMedicineSearch}
                      list="brow"
                    />
                    <datalist id="brow">
                      {meds.map((option, index) => (
                        <option key={index} value={option} />
                      ))}
                    </datalist>
                  </div>
                  <input
                    type="text"
                    className="mr-2 border border-gray-300 p-[1%]"
                  />
                </div>
                <button>
                  <p className="text-start text-[#F36562]">Add More</p>
                </button>
              </div>
              <div className="flex flex-row space-x-[1%]">
                <p className="font-bold">Tests</p>{" "}
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="mr-2 border border-gray-300 p-[1%]"
                    value={currentTest}
                    onChange={handleTestChange}
                  />
                  {tests.map((test, testindex) => (
                    <div key={testindex}>{test}</div>
                  ))}
                </div>
                <button className=" self-start" onClick={handleAddMoreTest}>
                  <p className="text-[#F36562]">Add More</p>
                </button>
              </div>
              <div className="flex flex-row space-x-2">
                <p className="font-bold">Note</p>
                <textarea className="mr-2 max-h-[111px] min-h-[111px] min-w-[826px] max-w-[826px] border border-gray-300 p-[1%]"></textarea>
              </div>
              <div className="flex h-[4%] w-full justify-center space-x-8 text-white">
                {" "}
                <button className="h-full w-[103px] bg-[#3D4460]">
                  Cancle
                </button>
                <button className="h-full w-[103px] bg-[#F36562]">Save</button>{" "}
              </div>
            </form>
          </div>
          <div className="flex h-[10%] w-full flex-row">
            <div className="flex h-full w-[50%] flex-col p-[0.4%]">
              <p className="font-bold">Previous Prescriptions</p>
              <div className="space-x-[1%]">
                <input type="text" className=" border border-gray-300" />
                <button className="bg-[#F36562] p-[0.5%] text-white">
                  View
                </button>
              </div>
            </div>
            <div className="flex h-full w-[50%] flex-col p-[0.4%]">
              <p className="font-bold">Test Procedures & Reports</p>
              <div className="space-x-[1%]">
                <input type="text" className=" border border-gray-300" />
                <button className="bg-[#F36562] p-[0.5%] text-white">
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-[20%] ">
          <div className="flex h-[50%] w-full items-center justify-center">
            <div className="flex h-[95%] w-[95%] flex-col rounded-sm border-2 border-gray-500 p-[1%]">
              <div className="h-[90%]">
                <input type="text" className="w-full border border-gray-300" />
                {template.map((item, index) => (
                  <div key={index}>
                    <input type="checkbox" />
                    {item}
                  </div>
                ))}
              </div>
              <button className="p-[5%] text-start text-red-500">
                <p>Add Template</p>
              </button>
            </div>
          </div>
          <div className="h-[50%] w-full p-2">
  <p>Abbreviations</p>
  <ul className="pl-[2%]">
    <li className="flex items-start">
      <span className="mr-2">&#8226;</span> OD - Once Daily ( প্রত্যহ একটি )
    </li>
    <li className="flex items-start">
      <span className="mr-2">&#8226;</span> BD - Two Times Daily ( প্রত্যহ দুইটি )
    </li>
    <li className="flex items-start">
      <span className="mr-2">&#8226;</span> TD - Thrice Daily ( প্রত্যহ তিনটি )
    </li>
    <li className="flex items-start">
      <span className="mr-2">&#8226;</span> BM - Before Meal ( খাবার আগে )
    </li>
    <li className="flex items-start">
      <span className="mr-2">&#8226;</span> AM - After Meal ( খাবার পরে )
    </li>
  </ul>
</div>

        </div>
      </div>
    </div>
  );
};

export default Prescriptiion;
