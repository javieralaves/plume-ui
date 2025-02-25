"use client";

import { Slider } from "../components/Slider";
import { useState } from "react";

export function SliderDemo() {
  const [values, setValues] = useState({
    basic: 50,
    withSteps: 40,
    withLabels: 60,
    range: [20, 80] as [number, number],
    disabled: 30,
  });

  const handleSingleValueChange =
    (key: keyof typeof values) => (value: number | [number, number]) => {
      if (!Array.isArray(value)) {
        setValues((prev) => ({ ...prev, [key]: value }));
      }
    };

  const handleRangeValueChange = (value: number | [number, number]) => {
    if (Array.isArray(value)) {
      setValues((prev) => ({ ...prev, range: value }));
    }
  };

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Slider</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Allows users to select a value or range from a given range.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Usage</h3>
        <div className="max-w-sm space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-medium">Basic Slider</label>
            <Slider
              value={values.basic}
              onChange={handleSingleValueChange("basic")}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">With Steps</h3>
        <div className="max-w-sm space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-medium">Step Size: 20</label>
            <Slider
              value={values.withSteps}
              onChange={handleSingleValueChange("withSteps")}
              step={20}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">With Labels</h3>
        <div className="max-w-sm space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-medium">Volume Control</label>
            <Slider
              value={values.withLabels}
              onChange={handleSingleValueChange("withLabels")}
              min={0}
              max={100}
              step={10}
              showLabels
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Range Slider</h3>
        <div className="max-w-sm space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-medium">Price Range</label>
            <Slider
              value={values.range}
              onChange={handleRangeValueChange}
              min={0}
              max={100}
              step={5}
              showLabels
              defaultValue={[0, 100]}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Disabled</h3>
        <div className="max-w-sm space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-medium">Disabled Slider</label>
            <Slider
              value={values.disabled}
              onChange={handleSingleValueChange("disabled")}
              disabled
            />
          </div>
        </div>
      </div>
    </section>
  );
}
