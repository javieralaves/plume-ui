"use client";

import { Input } from "../components/Input";
import { useState } from "react";

export function InputDemo() {
  const [values, setValues] = useState({
    basic: "",
    error: "Invalid value",
    disabled: "Disabled input",
    password: "",
    number: "",
    date: "",
  });

  const handleChange =
    (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [key]: e.target.value }));
    };

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Input</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Allows users to enter text or numeric data.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Size Variants</h3>
        <div className="space-y-4 max-w-sm">
          <Input
            size="sm"
            placeholder="Small input"
            value={values.basic}
            onChange={handleChange("basic")}
          />
          <Input
            size="md"
            placeholder="Medium input"
            value={values.basic}
            onChange={handleChange("basic")}
          />
          <Input
            size="lg"
            placeholder="Large input"
            value={values.basic}
            onChange={handleChange("basic")}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">States</h3>
        <div className="space-y-4 max-w-sm">
          <Input
            placeholder="Basic input"
            value={values.basic}
            onChange={handleChange("basic")}
          />
          <Input
            placeholder="Error input"
            value={values.error}
            onChange={handleChange("error")}
            error="This field is required"
          />
          <Input
            placeholder="Disabled input"
            value={values.disabled}
            onChange={handleChange("disabled")}
            disabled
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">With Labels</h3>
        <div className="space-y-4 max-w-sm">
          <Input
            label="Basic Input"
            placeholder="Enter text"
            value={values.basic}
            onChange={handleChange("basic")}
          />
          <Input
            label="Error Input"
            placeholder="Enter text"
            value={values.error}
            onChange={handleChange("error")}
            error="This field is required"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Special Types</h3>
        <div className="space-y-4 max-w-sm">
          <Input
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange("password")}
          />
          <Input
            type="number"
            placeholder="Number"
            value={values.number}
            onChange={handleChange("number")}
          />
          <Input
            type="date"
            value={values.date}
            onChange={handleChange("date")}
          />
        </div>
      </div>
    </section>
  );
}
