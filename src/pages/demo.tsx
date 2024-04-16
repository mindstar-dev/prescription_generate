import React, { useState } from "react";
import MultiSelectInput from "./../components/elements/Hybrid";

function ParentComponent() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelectedValuesChange = (values: string[]) => {
    setSelectedValues(values);
  };

  return (
    <div className="flex h-screen w-screen">
      <MultiSelectInput />
    </div>
  );
}

export default ParentComponent;
