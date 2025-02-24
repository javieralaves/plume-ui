"use client";

import { Button } from "./components/Button";
import { Switch } from "./components/Switch";
import { Checkbox } from "./components/Checkbox";
import { useState } from "react";

export default function Home() {
  const [switches, setSwitches] = useState({
    sm: false,
    md: false,
    lg: false,
    disabled: false,
    withLabel: false,
  });

  const [checkboxes, setCheckboxes] = useState({
    sm: false,
    md: false,
    lg: false,
    parent: false,
    child1: false,
    child2: false,
  });

  const handleSwitchChange =
    (key: keyof typeof switches) => (checked: boolean) => {
      setSwitches((prev) => ({ ...prev, [key]: checked }));
    };

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
    <div className="min-h-screen p-8 sm:p-20">
      <main className="max-w-5xl mx-auto space-y-20">
        {/* Typography Showcase */}
        <section>
          <h2 className="app-h2 mb-8">Typography</h2>

          <div className="grid gap-20">
            {/* Marketing Typography */}
            <div>
              <h3 className="app-h3 mb-6 text-text-secondary">
                Marketing Typography
              </h3>
              <div className="space-y-8">
                <h1 className="marketing-h1">Marketing H1 - Reckless</h1>
                <h2 className="marketing-h2">Marketing H2 - Reckless</h2>
                <h3 className="marketing-h3">Marketing H3 - Reckless</h3>
                <h4 className="marketing-h4">Marketing H4 - Reckless</h4>
                <h5 className="marketing-h5">Marketing H5 - Reckless</h5>
                <p className="marketing-body">
                  Marketing Body - Matter - The quick brown fox jumps over the
                  lazy dog.
                </p>
                <p className="marketing-body-sm">
                  Marketing Body Small - Matter - The quick brown fox jumps over
                  the lazy dog.
                </p>
                <p className="marketing-caption text-text-secondary">
                  Marketing Caption - Matter - The quick brown fox jumps over
                  the lazy dog.
                </p>
              </div>
            </div>

            {/* App Typography */}
            <div>
              <h3 className="app-h3 mb-6 text-text-secondary">
                App Typography
              </h3>
              <div className="space-y-6">
                <h1 className="app-h1">App H1 - Matter</h1>
                <h2 className="app-h2">App H2 - Matter</h2>
                <h3 className="app-h3">App H3 - Matter</h3>
                <h4 className="app-h4">App H4 - Matter</h4>
                <p className="app-body">
                  App Body - Matter - The quick brown fox jumps over the lazy
                  dog.
                </p>
                <p className="app-body-sm">
                  App Body Small - Matter - The quick brown fox jumps over the
                  lazy dog.
                </p>
                <p className="app-caption text-text-secondary">
                  App Caption - Matter - The quick brown fox jumps over the lazy
                  dog.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Color System */}
        <section>
          <h2 className="app-h2 mb-8">Color System</h2>

          <div className="grid gap-12">
            {/* Surface Colors */}
            <div>
              <h3 className="app-h3 mb-4 text-text-secondary">
                Surface Colors
              </h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-[200px_1fr] items-center gap-4 p-4 bg-surface-primary border border-border-light rounded-lg">
                  <span className="app-body-sm">surface-primary</span>
                  <span className="app-caption text-text-secondary">
                    Background: var(--surface-primary)
                  </span>
                </div>
                <div className="grid grid-cols-[200px_1fr] items-center gap-4 p-4 bg-surface-secondary border border-border-light rounded-lg">
                  <span className="app-body-sm">surface-secondary</span>
                  <span className="app-caption text-text-secondary">
                    Background: var(--surface-secondary)
                  </span>
                </div>
                <div className="grid grid-cols-[200px_1fr] items-center gap-4 p-4 bg-surface-tertiary border border-border-light rounded-lg">
                  <span className="app-body-sm">surface-tertiary</span>
                  <span className="app-caption text-text-secondary">
                    Background: var(--surface-tertiary)
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Colors */}
            <div>
              <h3 className="app-h3 mb-4 text-text-secondary">
                Interactive Colors
              </h3>
              <div className="grid gap-4">
                {/* Primary Colors */}
                <div className="grid grid-cols-[200px_1fr] items-center gap-4">
                  <div className="grid gap-2">
                    <div className="h-12 bg-primary rounded-lg"></div>
                    <span className="app-caption">primary</span>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-12 bg-primary-hover rounded-lg"></div>
                      <div className="h-12 bg-primary-light rounded-lg"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="app-caption">hover</span>
                      <span className="app-caption">light</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Background Colors */}
                <div className="grid grid-cols-[200px_1fr] items-center gap-4">
                  <div className="grid gap-2">
                    <div className="h-12 bg-interactive-primary-bg rounded-lg"></div>
                    <span className="app-caption">interactive-bg</span>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-12 bg-interactive-primary-bg-hover rounded-lg"></div>
                      <div className="h-12 bg-interactive-primary-bg-active rounded-lg"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="app-caption">hover</span>
                      <span className="app-caption">active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Colors */}
            <div>
              <h3 className="app-h3 mb-4 text-text-secondary">Status Colors</h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-[200px_1fr] items-center gap-4">
                  <div className="grid gap-2">
                    <div className="h-12 bg-success rounded-lg"></div>
                    <span className="app-caption">success</span>
                  </div>
                  <div className="grid gap-2">
                    <div className="h-12 bg-success-light rounded-lg"></div>
                    <span className="app-caption">light</span>
                  </div>
                </div>

                <div className="grid grid-cols-[200px_1fr] items-center gap-4">
                  <div className="grid gap-2">
                    <div className="h-12 bg-warning rounded-lg"></div>
                    <span className="app-caption">warning</span>
                  </div>
                  <div className="grid gap-2">
                    <div className="h-12 bg-warning-light rounded-lg"></div>
                    <span className="app-caption">light</span>
                  </div>
                </div>

                <div className="grid grid-cols-[200px_1fr] items-center gap-4">
                  <div className="grid gap-2">
                    <div className="h-12 bg-error rounded-lg"></div>
                    <span className="app-caption">error</span>
                  </div>
                  <div className="grid gap-2">
                    <div className="h-12 bg-error-light rounded-lg"></div>
                    <span className="app-caption">light</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Colors */}
            <div>
              <h3 className="app-h3 mb-4 text-text-secondary">Text Colors</h3>
              <div className="grid gap-4">
                <p className="text-text-primary app-body">Primary Text</p>
                <p className="text-text-secondary app-body">Secondary Text</p>
                <p className="text-text-tertiary app-body">Tertiary Text</p>
                <p className="text-text-disabled app-body">Disabled Text</p>
              </div>
            </div>

            {/* Border Colors */}
            <div>
              <h3 className="app-h3 mb-4 text-text-secondary">Border Colors</h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-[200px_1fr] items-center gap-4 p-4 border-2 border-border-light rounded-lg">
                  <span className="app-body-sm">border-light</span>
                  <span className="app-caption text-text-secondary">
                    Border: var(--border-light)
                  </span>
                </div>
                <div className="grid grid-cols-[200px_1fr] items-center gap-4 p-4 border-2 border-border-medium rounded-lg">
                  <span className="app-body-sm">border-medium</span>
                  <span className="app-caption text-text-secondary">
                    Border: var(--border-medium)
                  </span>
                </div>
                <div className="grid grid-cols-[200px_1fr] items-center gap-4 p-4 border-2 border-border-heavy rounded-lg">
                  <span className="app-body-sm">border-heavy</span>
                  <span className="app-caption text-text-secondary">
                    Border: var(--border-heavy)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Button Component Demo */}
        <section>
          <h2 className="app-h2 mb-8">Button Component</h2>
          <div className="space-y-8">
            {/* Primary Buttons */}
            <div className="space-y-2">
              <h3 className="app-h3 text-text-secondary">Primary Buttons</h3>
              <div className="flex gap-4 items-center">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            {/* Secondary Buttons */}
            <div className="space-y-2">
              <h3 className="app-h3 text-text-secondary">Secondary Buttons</h3>
              <div className="flex gap-4 items-center">
                <Button variant="secondary" size="sm">
                  Small
                </Button>
                <Button variant="secondary" size="md">
                  Medium
                </Button>
                <Button variant="secondary" size="lg">
                  Large
                </Button>
              </div>
            </div>

            {/* Disabled Buttons */}
            <div className="space-y-2">
              <h3 className="app-h3 text-text-secondary">Disabled Buttons</h3>
              <div className="flex gap-4 items-center">
                <Button disabled size="sm">
                  Small
                </Button>
                <Button disabled size="md">
                  Medium
                </Button>
                <Button disabled size="lg">
                  Large
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Switch Component Demo */}
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

        {/* Checkbox Component Demo */}
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
              <h3 className="app-h3 text-text-secondary">
                Parent-Child Example
              </h3>
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
      </main>
    </div>
  );
}
