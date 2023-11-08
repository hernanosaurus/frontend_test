import Select from "react-select";
import { useEffect, useState } from "react";

type ControlsProps = {
  handleSort: (sortBy: string, sortOrder: string) => void;
};

const Controls = ({ handleSort }: ControlsProps) => {
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("ascending");

  const fieldOptions = [
    { label: "Name", value: "name" },
    { label: "Company", value: "company" },
    { label: "Email", value: "email" },
  ];
  const directionOptions = [
    { label: "Ascending", value: "ascending" },
    { label: "Descending", value: "descending" },
  ];

  useEffect(() => {
    handleSort(sortBy, sortOrder);
  }, [sortBy, sortOrder]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSortByChange = (e: any) => {
    setSortBy(e.value);
  };

  const handleSortOrderChange = (e: any) => {
    setSortOrder(e.value);
  };

  return (
    <div className="gallery-controls controls">
      <div className="form-group group">
        <label htmlFor="sort-field" className="label">
          Sort Field
        </label>
        <Select
          options={fieldOptions}
          inputId="sort-field"
          className="input"
          onChange={handleSortByChange}
          value={fieldOptions.find((item) => item.value === sortBy)}
        />
      </div>
      <div className="form-group group">
        <label htmlFor="sort-direction" className="label">
          Sort Direction
        </label>
        <Select
          options={directionOptions}
          inputId="sort-direction"
          className="input"
          onChange={handleSortOrderChange}
          value={directionOptions.find((item) => item.value === sortOrder)}
        />
      </div>
    </div>
  );
};

export default Controls;
