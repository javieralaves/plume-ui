"use client";

import { Textarea } from "../components/Textarea";
import { useState } from "react";

export function TextareaDemo() {
  const [values, setValues] = useState({
    basic: "",
    error: "This is an example of an invalid input",
    disabled: "This textarea is disabled",
  });

  const handleChange =
    (key: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [key]: e.target.value }));
    };

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Textarea</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Allows users to enter multiline text.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Usage</h3>
        <div className="space-y-4 max-w-sm">
          <Textarea
            placeholder="Enter your message"
            value={values.basic}
            onChange={handleChange("basic")}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">States</h3>
        <div className="space-y-4 max-w-sm">
          <Textarea
            placeholder="Error state"
            value={values.error}
            onChange={handleChange("error")}
            error="This field is required"
          />
          <Textarea
            placeholder="Disabled state"
            value={values.disabled}
            onChange={handleChange("disabled")}
            disabled
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">With Labels</h3>
        <div className="space-y-4 max-w-sm">
          <Textarea
            label="Message"
            placeholder="Enter your message"
            value={values.basic}
            onChange={handleChange("basic")}
          />
          <Textarea
            label="Error Message"
            placeholder="Enter your message"
            value={values.error}
            onChange={handleChange("error")}
            error="This field is required"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Custom Rows</h3>
        <div className="space-y-4 max-w-sm">
          <Textarea
            placeholder="2 rows"
            value={values.basic}
            onChange={handleChange("basic")}
            rows={2}
          />
          <Textarea
            placeholder="4 rows"
            value={values.basic}
            onChange={handleChange("basic")}
            rows={4}
          />
        </div>
      </div>
    </section>
  );
}
