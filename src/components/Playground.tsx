"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Switch } from "./Switch";

type ComponentType = "button" | "switch";

interface PlaygroundProps {
  className?: string;
}

// Define component configurations
const COMPONENTS: Record<
  ComponentType,
  {
    name: string;
    component: React.ComponentType<any>;
    variants?: string[];
    properties: {
      name: string;
      type: "select" | "boolean";
      options?: string[];
    }[];
    defaultProps?: Record<string, any>;
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
    defaultProps: {
      size: "md",
      disabled: false,
    },
  },
  switch: {
    name: "Switch",
    component: Switch,
    properties: [
      {
        name: "size",
        type: "select",
        options: ["sm", "md", "lg"],
      },
      {
        name: "checked",
        type: "boolean",
      },
      {
        name: "disabled",
        type: "boolean",
      },
    ],
    defaultProps: {
      size: "md",
      checked: false,
      disabled: false,
    },
  },
};

export function Playground({ className }: PlaygroundProps) {
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentType>("button");
  const [variant, setVariant] = useState(
    COMPONENTS[selectedComponent].variants?.[0] || ""
  );
  const [properties, setProperties] = useState<Record<string, any>>(() => {
    // Initialize properties with handlers for interactive components
    const initialProps = COMPONENTS[selectedComponent].defaultProps || {};
    if (selectedComponent === "switch") {
      return {
        ...initialProps,
        onCheckedChange: (checked: boolean) => {
          setProperties((p) => ({ ...p, checked }));
        },
      };
    }
    return initialProps;
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  const Component = COMPONENTS[selectedComponent].component;
  const componentConfig = COMPONENTS[selectedComponent];

  // Handle component change
  const handleComponentChange = (newComponent: ComponentType) => {
    setSelectedComponent(newComponent);
    setVariant(COMPONENTS[newComponent].variants?.[0] || "");
    // Initialize properties with handlers for the new component
    const newProps = COMPONENTS[newComponent].defaultProps || {};
    if (newComponent === "switch") {
      setProperties({
        ...newProps,
        onCheckedChange: (checked: boolean) => {
          setProperties((p) => ({ ...p, checked }));
        },
      });
    } else {
      setProperties(newProps);
    }
  };

  // Special handler for switch checked state
  const handlePropertyChange = (name: string, value: any) => {
    setProperties((prev) => {
      const newProps = { ...prev, [name]: value };
      // Preserve the onCheckedChange handler for switch
      if (selectedComponent === "switch" && name === "checked") {
        return {
          ...newProps,
          onCheckedChange: prev.onCheckedChange,
        };
      }
      return newProps;
    });
  };

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
                handleComponentChange(e.target.value as ComponentType)
              }
            >
              {Object.entries(COMPONENTS).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.name}
                </option>
              ))}
            </select>
          </div>

          {componentConfig.variants && componentConfig.variants.length > 0 && (
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
          )}

          {componentConfig.properties &&
            componentConfig.properties.length > 0 && (
              <div className="space-y-4">
                <h3 className="app-h4">Properties</h3>
                <div className="space-y-4">
                  {componentConfig.properties.map((prop) => (
                    <div key={prop.name} className="space-y-2">
                      {prop.type === "select" && (
                        <>
                          <label className="app-body-sm text-text-secondary">
                            {prop.name}
                          </label>
                          <select
                            className="w-full px-3 py-2 rounded-lg border border-border-medium bg-surface-primary"
                            value={properties[prop.name]}
                            onChange={(e) =>
                              handlePropertyChange(prop.name, e.target.value)
                            }
                          >
                            {prop.options?.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </>
                      )}
                      {prop.type === "boolean" && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-text-secondary">
                            {prop.name === "checked" ? "Active" : "Disabled"}
                          </span>
                          <Switch
                            size="sm"
                            checked={properties[prop.name]}
                            onCheckedChange={(checked) =>
                              handlePropertyChange(prop.name, checked)
                            }
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

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
            {selectedComponent === "button" && componentConfig.name}
          </Component>
        </div>
      </div>
    </div>
  );
}
