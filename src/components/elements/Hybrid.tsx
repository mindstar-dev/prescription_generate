import React, { useState } from "react";

interface MultiSelectInputProps {
  onSelectedValuesChange: (values: string[]) => void;
}

function MultiSelectInput({ onSelectedValuesChange }: MultiSelectInputProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;

    if (!selectedValues.includes(selectedOption)) {
      const updatedValues = [...selectedValues, selectedOption];
      setSelectedValues(updatedValues);
      onSelectedValuesChange(updatedValues);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (e.key === "Enter") {
      const newOption = inputValue.trim();
      if (newOption && !selectedValues.includes(newOption)) {
        setSelectedValues([...selectedValues, newOption]);
        setInputValue("");
        onSelectedValuesChange([...selectedValues, newOption]);
      }
    }
  };

  const handleRemoveValue = (valueToRemove: string) => {
    setSelectedValues(
      selectedValues.filter((value) => value !== valueToRemove),
    );
    onSelectedValuesChange(
      selectedValues.filter((value) => value !== valueToRemove),
    );
  };

  return (
    <div>
      <select
        value={inputValue}
        onChange={handleSelectChange}
        onKeyPress={handleKeyDown}
        onBlur={() => setInputValue("")}
        multiple
      >
        {selectedValues.map((value, index) => (
          <option key={index} value={value} disabled>
            {value}
          </option>
        ))}
        <option>asdas</option>
        <option>465</option>
      </select>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type here to add new option"
      />
      <div>
        {selectedValues.map((value, index) => (
          <span key={index}>
            {value}
            <button onClick={() => handleRemoveValue(value)}>x</button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default MultiSelectInput;
