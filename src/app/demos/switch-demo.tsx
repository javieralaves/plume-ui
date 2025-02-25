"use client";

import { useState } from "react";
import { Switch } from "../components/Switch";

export function SwitchDemo() {
  const [switches, setSwitches] = useState({
    sm: false,
    md: false,
    lg: false,
    disabled: false,
    withLabel: false,
  });

  const handleSwitchChange =
    (key: keyof typeof switches) => (checked: boolean) => {
      setSwitches((prev) => ({ ...prev, [key]: checked }));
    };

  return (
    <section>
      <h2 className="app-h2 mb-8">Switch Component</h2>
      <div className="space-y-8">
        {/* Size Variants */}
        <div className="space-y-2">
          <h3 className="app-h3 text-text-secondary">Size Variants</h3>
          <div className="flex flex-col gap-4">
            <Switch
              size="sm"
              checked={switches.sm}
              onChange={handleSwitchChange("sm")}
              label="Small Switch"
            />
            <Switch
              size="md"
              checked={switches.md}
              onChange={handleSwitchChange("md")}
              label="Medium Switch (Default)"
            />
            <Switch
              size="lg"
              checked={switches.lg}
              onChange={handleSwitchChange("lg")}
              label="Large Switch"
            />
          </div>
        </div>

        {/* States */}
        <div className="space-y-2">
          <h3 className="app-h3 text-text-secondary">States</h3>
          <div className="flex flex-col gap-4">
            <Switch
              checked={switches.disabled}
              onChange={handleSwitchChange("disabled")}
              label="Enabled Switch"
            />
            <Switch
              checked={false}
              onChange={() => {}}
              disabled
              label="Disabled Switch (Unchecked)"
            />
            <Switch
              checked={true}
              onChange={() => {}}
              disabled
              label="Disabled Switch (Checked)"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
