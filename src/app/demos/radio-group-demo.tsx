"use client";

import { useState } from "react";
import { RadioGroup, RadioItem } from "../components/RadioGroup";

export function RadioGroupDemo() {
  const [radioValues, setRadioValues] = useState({
    size: "medium",
    fruit: "apple",
    disabled: "option1",
  });

  return (
    <section>
      <h2 className="app-h2 mb-8">RadioGroup Component</h2>
      <div className="space-y-8">
        {/* Size Variants */}
        <div className="space-y-2">
          <h3 className="app-h3 text-text-secondary">Size Variants</h3>
          <div className="space-y-8">
            <RadioGroup
              size="sm"
              orientation="horizontal"
              label="Small Radio Group (Horizontal)"
              value={radioValues.size}
              onChange={(value) =>
                setRadioValues((prev) => ({ ...prev, size: value }))
              }
            >
              <RadioItem value="small" label="Small Option" />
              <RadioItem value="medium" label="Medium Option" />
              <RadioItem value="large" label="Large Option" />
            </RadioGroup>

            <RadioGroup
              size="md"
              label="Medium Radio Group (Vertical)"
              value={radioValues.fruit}
              onChange={(value) =>
                setRadioValues((prev) => ({ ...prev, fruit: value }))
              }
            >
              <RadioItem value="apple" label="Apple" />
              <RadioItem value="banana" label="Banana" />
              <RadioItem value="orange" label="Orange" />
            </RadioGroup>

            <RadioGroup
              size="lg"
              orientation="horizontal"
              label="Large Radio Group (Horizontal)"
              value={radioValues.fruit}
              onChange={(value) =>
                setRadioValues((prev) => ({ ...prev, fruit: value }))
              }
            >
              <RadioItem value="apple" label="Apple" />
              <RadioItem value="banana" label="Banana" />
              <RadioItem value="orange" label="Orange" />
            </RadioGroup>
          </div>
        </div>

        {/* States */}
        <div className="space-y-2">
          <h3 className="app-h3 text-text-secondary">States</h3>
          <div className="space-y-8">
            <RadioGroup
              disabled
              orientation="horizontal"
              label="Disabled Radio Group (Horizontal)"
              value={radioValues.disabled}
              onChange={(value) =>
                setRadioValues((prev) => ({ ...prev, disabled: value }))
              }
            >
              <RadioItem value="option1" label="Option 1" />
              <RadioItem value="option2" label="Option 2" />
              <RadioItem value="option3" label="Option 3" />
            </RadioGroup>

            <RadioGroup
              label="Mixed States (Vertical)"
              value={radioValues.disabled}
              onChange={(value) =>
                setRadioValues((prev) => ({ ...prev, disabled: value }))
              }
            >
              <RadioItem value="option1" label="Enabled Option" />
              <RadioItem value="option2" disabled label="Disabled Option" />
              <RadioItem value="option3" label="Enabled Option" />
            </RadioGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
