"use client";

import { useState } from "react";
import { Button } from "./Button";

type ComponentType = "button";

interface PlaygroundProps {
  className?: string;
}

// Define component configurations
const COMPONENTS: Record<
  ComponentType,
  {
    name: string;
    component: React.ComponentType<any>;
    variants: string[];
    properties: {
      name: string;
      type: "select" | "boolean";
      options?: string[];
    }[];
  }
> = {
  button: {
    name: "Button",
    component: Button,
    variants: ["primary", "neutral", "ghost"],
    properties: [
      {
        name: "size",
        type: "select",
        options: ["sm", "md", "lg"],
      },
      {
        name: "disabled",
        type: "boolean",
      },
    ],
  },
};

export function Playground({ className }: PlaygroundProps) {
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentType>("button");
  const [variant, setVariant] = useState(
    COMPONENTS[selectedComponent].variants[0]
  );
  const [properties, setProperties] = useState<Record<string, any>>({
    size: "md",
    disabled: false,
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  const Component = COMPONENTS[selectedComponent].component;
  const componentConfig = COMPONENTS[selectedComponent];

  return (
    <div className={className}>
      <div className="grid grid-cols-[300px_1fr] min-h-[600px] border border-border-light rounded-xl overflow-hidden">
        {/* Controls Panel */}
        <div className="border-r border-border-light p-6 space-y-8">
          <div className="space-y-4">
            <h3 className="app-h4">Component</h3>
            <select
              className="w-full px-3 py-2 rounded-lg border border-border-medium bg-surface-primary"
              value={selectedComponent}
              onChange={(e) =>
                setSelectedComponent(e.target.value as ComponentType)
              }
            >
              {Object.entries(COMPONENTS).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <h3 className="app-h4">Variant</h3>
            <select
              className="w-full px-3 py-2 rounded-lg border border-border-medium bg-surface-primary"
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
            >
              {componentConfig.variants.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <h3 className="app-h4">Properties</h3>
            <div className="space-y-4">
              {componentConfig.properties.map((prop) => (
                <div key={prop.name} className="space-y-2">
                  <label className="app-body-sm text-text-secondary">
                    {prop.name}
                  </label>
                  {prop.type === "select" && (
                    <select
                      className="w-full px-3 py-2 rounded-lg border border-border-medium bg-surface-primary"
                      value={properties[prop.name]}
                      onChange={(e) =>
                        setProperties((prev) => ({
                          ...prev,
                          [prop.name]: e.target.value,
                        }))
                      }
                    >
                      {prop.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                  {prop.type === "boolean" && (
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={properties[prop.name]}
                        onChange={(e) =>
                          setProperties((prev) => ({
                            ...prev,
                            [prop.name]: e.target.checked,
                          }))
                        }
                      />
                      <span>Enabled</span>
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="app-h4">Theme</h3>
            <button
              className="app-body-sm px-3 py-2 rounded-lg border border-border-medium hover:border-primary hover:text-primary"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        <div
          className={`${
            isDarkMode ? "dark bg-[#0a0a0a]" : "bg-background"
          } flex items-center justify-center p-8`}
        >
          <Component variant={variant} {...properties}>
            {componentConfig.name}
          </Component>
        </div>
      </div>
    </div>
  );
}
