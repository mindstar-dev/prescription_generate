import React, { useState } from "react";
import { api } from "~/utils/api";

const MultiSelectInput: React.FC = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const { data: sym } = api.symptom.get_all.useQuery();

  return (
    <div className="flex h-fit w-[30%] border-2 border-black">
      <div className="flex h-16 w-1/2 bg-red-500">
        {selectedValues.map((item) => (
          <p>{item}</p>
        ))}
      </div>
      <div className="flex w-1/2 flex-col">
        <input
          className="h-16"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <div className="w-full bg-slate-500">
          {sym
            ?.filter(
              (item) =>
                inputValue !== "" &&
                item.name.includes(inputValue) &&
                !selectedValues.includes(item.name),
            )
            .map((item, index) => {
              return (
                <p
                  className="hover:bg-white"
                  onClick={() => {
                    setSelectedValues([...selectedValues, `${item.name},`]);
                  }}
                >
                  {item.name}
                </p>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MultiSelectInput;
