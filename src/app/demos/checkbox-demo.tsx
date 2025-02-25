"use client";

import { useState } from "react";
import { Checkbox } from "../components/Checkbox";

export function CheckboxDemo() {
  const [checkboxes, setCheckboxes] = useState({
    sm: false,
    md: false,
    lg: false,
    parent: false,
    child1: false,
    child2: false,
  });

  const handleCheckboxChange =
    (key: keyof typeof checkboxes) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckboxes((prev) => ({ ...prev, [key]: e.target.checked }));
    };

  // Calculate parent checkbox state based on children
  const allChildrenChecked = checkboxes.child1 && checkboxes.child2;
  const someChildrenChecked = checkboxes.child1 || checkboxes.child2;
  const isIndeterminate = someChildrenChecked && !allChildrenChecked;

  // Handle parent checkbox click
  const handleParentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setCheckboxes((prev) => ({
      ...prev,
      parent: newValue,
      child1: newValue,
      child2: newValue,
    }));
  };

  return (
    <section>
      <h2 className="app-h2 mb-8">Checkbox Component</h2>
      <div className="space-y-8">
        {/* Size Variants */}
        <div className="space-y-2">
          <h3 className="app-h3 text-text-secondary">Size Variants</h3>
          <div className="flex flex-col gap-4">
            <Checkbox
              size="sm"
              checked={checkboxes.sm}
              onChange={handleCheckboxChange("sm")}
              label="Small Checkbox"
            />
            <Checkbox
              size="md"
              checked={checkboxes.md}
              onChange={handleCheckboxChange("md")}
              label="Medium Checkbox (Default)"
            />
            <Checkbox
              size="lg"
              checked={checkboxes.lg}
              onChange={handleCheckboxChange("lg")}
              label="Large Checkbox"
            />
          </div>
        </div>

        {/* States */}
        <div className="space-y-2">
          <h3 className="app-h3 text-text-secondary">States</h3>
          <div className="flex flex-col gap-4">
            <Checkbox
              checked={false}
              onChange={() => {}}
              disabled
              label="Disabled Unchecked"
            />
            <Checkbox
              checked={true}
              onChange={() => {}}
              disabled
              label="Disabled Checked"
            />
            <Checkbox
              checked={false}
              onChange={() => {}}
              disabled
              indeterminate
              label="Disabled Indeterminate"
            />
          </div>
        </div>

        {/* Parent-Child Example */}
        <div className="space-y-2">
          <h3 className="app-h3 text-text-secondary">Parent-Child Example</h3>
          <div className="flex flex-col gap-4">
            <Checkbox
              checked={allChildrenChecked}
              indeterminate={isIndeterminate}
              onChange={handleParentChange}
              label="Parent Checkbox"
            />
            <div className="ml-6 flex flex-col gap-2">
              <Checkbox
                checked={checkboxes.child1}
                onChange={handleCheckboxChange("child1")}
                label="Child Checkbox 1"
              />
              <Checkbox
                checked={checkboxes.child2}
                onChange={handleCheckboxChange("child2")}
                label="Child Checkbox 2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
