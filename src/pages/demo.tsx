import React, { useState } from "react";
import MultiSelectInput from "./../components/elements/Hybrid";

function ParentComponent() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelectedValuesChange = (values: string[]) => {
    setSelectedValues(values);
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <MultiSelectInput onSelectedValuesChange={handleSelectedValuesChange} />
      <p>Selected Values: {selectedValues.join(", ")}</p>
    </div>
  );
}

export default ParentComponent;
