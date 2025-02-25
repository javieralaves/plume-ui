"use client";

import { Button } from "./components/Button";
import { Switch } from "./components/Switch";
import { Checkbox } from "./components/Checkbox";
import { RadioGroup, RadioItem } from "./components/RadioGroup";
import { Tabs, TabList, Tab, TabPanel } from "./components/Tabs";
import { Alert } from "./components/Alert";
import { Avatar } from "./components/Avatar";
import { Badge } from "./components/Badge";
import { Input } from "./components/Input";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Bell,
  Settings,
  User,
  LogOut,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { Textarea } from "./components/Textarea";
import {
  DropdownMenu,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownDivider,
} from "./components/DropdownMenu";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardStat,
} from "./components/Card";
import { BarChart3, Info, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "./components/Dialog";
import { Accordion, AccordionItem } from "./components/Accordion";
import { Slider } from "./components/Slider";
import { ToastProvider, useToast } from "./components/Toast";
import { DataTable } from "./components/DataTable/DataTable";

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

  const [radioValues, setRadioValues] = useState({
    size: "medium",
    fruit: "apple",
    disabled: "option1",
  });

  const [activeTab, setActiveTab] = useState({
    size: "tab1",
    modern: "tab1",
    traditional: "tab1",
    demo: "tab1",
  });

  const [showAlerts, setShowAlerts] = useState({
    success: true,
    warning: true,
    error: true,
    info: true,
  });

  const [inputValues, setInputValues] = useState({
    error: "Invalid value",
    disabled: "Disabled input",
    password: "",
    number: "",
    date: "",
  });

  const [textareaValues, setTextareaValues] = useState({
    error: "This is an example of an invalid input",
    disabled: "This textarea is disabled",
    basic: "",
  });

  const [dialogs, setDialogs] = useState({
    basic: false,
    confirmation: false,
    scrollable: false,
  });

  const [sliderValues, setSliderValues] = useState({
    basic: 50,
    withSteps: 40,
    withLabels: 60,
    range: [20, 80] as [number, number],
    disabled: 30,
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

  const dismissAlert = (type: keyof typeof showAlerts) => {
    setShowAlerts((prev) => ({ ...prev, [type]: false }));
  };

  const handleInputChange =
    (key: keyof typeof inputValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValues((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleTextareaChange =
    (key: keyof typeof textareaValues) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextareaValues((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleDropdownAction = (action: string) => {
    console.log(`Dropdown action: ${action}`);
  };

  const handleCardClick = () => {
    console.log("Card clicked");
  };

  const openDialog = (key: keyof typeof dialogs) => {
    setDialogs((prev) => ({ ...prev, [key]: true }));
  };

  const closeDialog = (key: keyof typeof dialogs) => {
    setDialogs((prev) => ({ ...prev, [key]: false }));
  };

  return (
    <ToastProvider>
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
                    Marketing Body Small - Matter - The quick brown fox jumps
                    over the lazy dog.
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
                    App Caption - Matter - The quick brown fox jumps over the
                    lazy dog.
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
                <h3 className="app-h3 mb-4 text-text-secondary">
                  Status Colors
                </h3>
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
                <h3 className="app-h3 mb-4 text-text-secondary">
                  Border Colors
                </h3>
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
                <h3 className="app-h3 text-text-secondary">
                  Secondary Buttons
                </h3>
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

          {/* RadioGroup Component Demo */}
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
                    <RadioItem
                      value="option2"
                      disabled
                      label="Disabled Option"
                    />
                    <RadioItem value="option3" label="Enabled Option" />
                  </RadioGroup>
                </div>
              </div>
            </div>
          </section>

          {/* Tabs Component Demo */}
          <section>
            <h2 className="app-h2 mb-8">Tabs Component</h2>
            <div className="space-y-8">
              {/* Variants */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Variants</h3>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-app-body font-medium mb-4">
                      Modern (Pill Style)
                    </h4>
                    <Tabs
                      variant="modern"
                      value={activeTab.modern}
                      onChange={(value) =>
                        setActiveTab((prev) => ({ ...prev, modern: value }))
                      }
                    >
                      <TabList>
                        <Tab value="tab1">Dashboard</Tab>
                        <Tab value="tab2">Settings</Tab>
                        <Tab value="tab3">Messages</Tab>
                      </TabList>
                      <TabPanel value="tab1">
                        <p>Dashboard content goes here</p>
                      </TabPanel>
                      <TabPanel value="tab2">
                        <p>Settings content goes here</p>
                      </TabPanel>
                      <TabPanel value="tab3">
                        <p>Messages content goes here</p>
                      </TabPanel>
                    </Tabs>
                  </div>

                  <div>
                    <h4 className="text-app-body font-medium mb-4">
                      Traditional (Underlined)
                    </h4>
                    <Tabs
                      variant="traditional"
                      value={activeTab.traditional}
                      onChange={(value) =>
                        setActiveTab((prev) => ({
                          ...prev,
                          traditional: value,
                        }))
                      }
                    >
                      <TabList>
                        <Tab value="tab1">Account</Tab>
                        <Tab value="tab2">Security</Tab>
                        <Tab value="tab3">Notifications</Tab>
                      </TabList>
                      <TabPanel value="tab1">
                        <p>Account settings content goes here</p>
                      </TabPanel>
                      <TabPanel value="tab2">
                        <p>Security settings content goes here</p>
                      </TabPanel>
                      <TabPanel value="tab3">
                        <p>Notification preferences content goes here</p>
                      </TabPanel>
                    </Tabs>
                  </div>
                </div>
              </div>

              {/* Size Variants */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Size Variants</h3>
                <div className="space-y-8">
                  <Tabs
                    size="sm"
                    value={activeTab.size}
                    onChange={(value) =>
                      setActiveTab((prev) => ({ ...prev, size: value }))
                    }
                  >
                    <TabList>
                      <Tab value="tab1">Small Tab 1</Tab>
                      <Tab value="tab2">Small Tab 2</Tab>
                      <Tab value="tab3">Small Tab 3</Tab>
                    </TabList>
                    <TabPanel value="tab1">
                      <p>Content for Small Tab 1</p>
                    </TabPanel>
                    <TabPanel value="tab2">
                      <p>Content for Small Tab 2</p>
                    </TabPanel>
                    <TabPanel value="tab3">
                      <p>Content for Small Tab 3</p>
                    </TabPanel>
                  </Tabs>

                  <Tabs
                    size="md"
                    value={activeTab.demo}
                    onChange={(value) =>
                      setActiveTab((prev) => ({ ...prev, demo: value }))
                    }
                  >
                    <TabList>
                      <Tab value="tab1">Medium Tab 1</Tab>
                      <Tab value="tab2">Medium Tab 2</Tab>
                      <Tab value="tab3">Medium Tab 3</Tab>
                    </TabList>
                    <TabPanel value="tab1">
                      <p>Content for Medium Tab 1</p>
                    </TabPanel>
                    <TabPanel value="tab2">
                      <p>Content for Medium Tab 2</p>
                    </TabPanel>
                    <TabPanel value="tab3">
                      <p>Content for Medium Tab 3</p>
                    </TabPanel>
                  </Tabs>

                  <Tabs
                    size="lg"
                    value={activeTab.demo}
                    onChange={(value) =>
                      setActiveTab((prev) => ({ ...prev, demo: value }))
                    }
                  >
                    <TabList>
                      <Tab value="tab1">Large Tab 1</Tab>
                      <Tab value="tab2">Large Tab 2</Tab>
                      <Tab value="tab3">Large Tab 3</Tab>
                    </TabList>
                    <TabPanel value="tab1">
                      <p>Content for Large Tab 1</p>
                    </TabPanel>
                    <TabPanel value="tab2">
                      <p>Content for Large Tab 2</p>
                    </TabPanel>
                    <TabPanel value="tab3">
                      <p>Content for Large Tab 3</p>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>

              {/* States */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">States</h3>
                <Tabs
                  value={activeTab.demo}
                  onChange={(value) =>
                    setActiveTab((prev) => ({ ...prev, demo: value }))
                  }
                >
                  <TabList>
                    <Tab value="tab1">Enabled Tab</Tab>
                    <Tab value="tab2" disabled>
                      Disabled Tab
                    </Tab>
                    <Tab value="tab3">Enabled Tab</Tab>
                  </TabList>
                  <TabPanel value="tab1">
                    <p>Content for Enabled Tab</p>
                  </TabPanel>
                  <TabPanel value="tab2">
                    <p>Content for Disabled Tab</p>
                  </TabPanel>
                  <TabPanel value="tab3">
                    <p>Content for Enabled Tab</p>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </section>

          {/* Alert Component Demo */}
          <section>
            <h2 className="app-h2 mb-8">Alert Component</h2>
            <div className="space-y-8">
              {/* Alert Types */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Alert Types</h3>
                <div className="space-y-4">
                  {showAlerts.success && (
                    <Alert
                      type="success"
                      title="Success Alert"
                      onDismiss={() => dismissAlert("success")}
                    >
                      Your changes have been successfully saved.
                    </Alert>
                  )}

                  {showAlerts.warning && (
                    <Alert
                      type="warning"
                      title="Warning Alert"
                      onDismiss={() => dismissAlert("warning")}
                    >
                      Your session will expire in 5 minutes. Please save your
                      work.
                    </Alert>
                  )}

                  {showAlerts.error && (
                    <Alert
                      type="error"
                      title="Error Alert"
                      onDismiss={() => dismissAlert("error")}
                    >
                      There was an error processing your request. Please try
                      again.
                    </Alert>
                  )}

                  {showAlerts.info && (
                    <Alert
                      type="info"
                      title="Info Alert"
                      onDismiss={() => dismissAlert("info")}
                    >
                      A new version of the application is available.
                    </Alert>
                  )}
                </div>
              </div>

              {/* Non-dismissible Alerts */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">
                  Non-dismissible Alerts
                </h3>
                <div className="space-y-4">
                  <Alert type="success">
                    This is a non-dismissible success alert.
                  </Alert>

                  <Alert type="warning">
                    This is a non-dismissible warning alert.
                  </Alert>

                  <Alert type="error">
                    This is a non-dismissible error alert.
                  </Alert>

                  <Alert type="info">
                    This is a non-dismissible info alert.
                  </Alert>
                </div>
              </div>

              {/* Alerts without titles */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">
                  Alerts without titles
                </h3>
                <div className="space-y-4">
                  <Alert type="success">
                    A simple success message with no title.
                  </Alert>
                  <Alert type="warning">
                    A simple warning message with no title.
                  </Alert>
                  <Alert type="error">
                    A simple error message with no title.
                  </Alert>
                  <Alert type="info">
                    A simple info message with no title.
                  </Alert>
                </div>
              </div>
            </div>
          </section>

          {/* Avatar Component Demo */}
          <section>
            <h2 className="app-h2 mb-8">Avatar Component</h2>
            <div className="space-y-8">
              {/* Size Variants */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Size Variants</h3>
                <div className="flex gap-4 items-center">
                  <Avatar
                    size="sm"
                    src="/images/avatar-1.jpeg"
                    alt="Small avatar"
                  />
                  <Avatar
                    size="md"
                    src="/images/avatar-1.jpeg"
                    alt="Medium avatar"
                  />
                  <Avatar
                    size="lg"
                    src="/images/avatar-1.jpeg"
                    alt="Large avatar"
                  />
                </div>
              </div>

              {/* Initials Fallback */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">
                  Initials Fallback
                </h3>
                <div className="flex gap-4 items-center">
                  <Avatar size="sm" initials="JD" />
                  <Avatar size="md" initials="AB" />
                  <Avatar size="lg" initials="YZ" />
                </div>
              </div>

              {/* Icon Fallback */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Icon Fallback</h3>
                <div className="flex gap-4 items-center">
                  <Avatar size="sm" />
                  <Avatar size="md" />
                  <Avatar size="lg" />
                </div>
              </div>

              {/* Image Error Fallback */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">
                  Image Error Fallback
                </h3>
                <div className="flex gap-4 items-center">
                  <Avatar
                    size="md"
                    src="/non-existent-image.jpg"
                    initials="FB"
                    alt="Fallback example"
                  />
                  <Avatar
                    size="md"
                    src="/another-missing-image.jpg"
                    alt="Fallback to icon"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Badge Component Demo */}
          <section>
            <h2 className="app-h2 mb-8">Badge Component</h2>
            <div className="space-y-8">
              {/* Badge Variants */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Badge Variants</h3>
                <div className="flex gap-4 items-center">
                  <Badge>Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                </div>
              </div>

              {/* Size Variants */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Size Variants</h3>
                <div className="flex gap-4 items-center">
                  <Badge size="sm">Small</Badge>
                  <Badge size="md">Medium</Badge>
                  <Badge size="lg">Large</Badge>
                </div>
              </div>

              {/* Badges with Icons */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">
                  Badges with Icons
                </h3>
                <div className="flex gap-4 items-center">
                  <Badge
                    variant="success"
                    icon={<CheckCircle className="w-3.5 h-3.5" />}
                  >
                    Completed
                  </Badge>
                  <Badge
                    variant="warning"
                    icon={<AlertTriangle className="w-3.5 h-3.5" />}
                  >
                    Pending
                  </Badge>
                  <Badge
                    variant="error"
                    icon={<XCircle className="w-3.5 h-3.5" />}
                  >
                    Failed
                  </Badge>
                  <Badge
                    variant="primary"
                    icon={<Bell className="w-3.5 h-3.5" />}
                  >
                    Notifications
                  </Badge>
                </div>
              </div>

              {/* Outline Badges */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Outline Badges</h3>
                <div className="flex gap-4 items-center">
                  <Badge outline>Default</Badge>
                  <Badge variant="primary" outline>
                    Primary
                  </Badge>
                  <Badge variant="success" outline>
                    Success
                  </Badge>
                  <Badge variant="warning" outline>
                    Warning
                  </Badge>
                  <Badge variant="error" outline>
                    Error
                  </Badge>
                </div>
              </div>

              {/* Dismissible Badges */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">
                  Dismissible Badges
                </h3>
                <div className="flex gap-4 items-center">
                  <Badge onDismiss={() => {}}>Dismissible</Badge>
                  <Badge variant="primary" onDismiss={() => {}}>
                    Click X
                  </Badge>
                  <Badge
                    variant="success"
                    icon={<CheckCircle className="w-3.5 h-3.5" />}
                    onDismiss={() => {}}
                  >
                    With Icon
                  </Badge>
                </div>
              </div>

              {/* Status Badges */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Status Badges</h3>
                <div className="flex gap-4 items-center">
                  <Badge variant="success" isStatus>
                    Active
                  </Badge>
                  <Badge variant="warning" isStatus>
                    Away
                  </Badge>
                  <Badge variant="error" isStatus>
                    Offline
                  </Badge>
                  <Badge variant="primary" isStatus>
                    Busy
                  </Badge>
                </div>
              </div>
            </div>
          </section>

          {/* Input Component Demo */}
          <section>
            <h2 className="app-h2 mb-8">Input Component</h2>
            <div className="space-y-8">
              {/* Basic Input */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Basic Input</h3>
                <div className="max-w-sm">
                  <Input placeholder="Enter your text here" />
                </div>
              </div>

              {/* Input with Label */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Input with Label</h3>
                <div className="max-w-sm">
                  <Input
                    label="Email Address"
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>
              </div>

              {/* Size Variants */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Size Variants</h3>
                <div className="max-w-sm space-y-4">
                  <Input
                    size="sm"
                    placeholder="Small input"
                    label="Small Input"
                  />
                  <Input
                    size="md"
                    placeholder="Medium input"
                    label="Medium Input"
                  />
                  <Input
                    size="lg"
                    placeholder="Large input"
                    label="Large Input"
                  />
                </div>
              </div>

              {/* Input States */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Input States</h3>
                <div className="max-w-sm space-y-4">
                  <Input
                    label="Error State"
                    placeholder="Error input"
                    error="This field is required"
                    value={inputValues.error}
                    onChange={handleInputChange("error")}
                  />
                  <Input
                    label="Disabled State"
                    placeholder="Disabled input"
                    disabled
                    value={inputValues.disabled}
                    onChange={handleInputChange("disabled")}
                  />
                </div>
              </div>

              {/* Input Types */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Input Types</h3>
                <div className="max-w-sm space-y-4">
                  <Input
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    value={inputValues.password}
                    onChange={handleInputChange("password")}
                  />
                  <Input
                    type="number"
                    label="Number"
                    placeholder="Enter a number"
                    value={inputValues.number}
                    onChange={handleInputChange("number")}
                  />
                  <Input
                    type="date"
                    label="Date"
                    value={inputValues.date}
                    onChange={handleInputChange("date")}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Textarea Component Demo */}
          <section>
            <h2 className="app-h2 mb-8">Textarea Component</h2>
            <div className="space-y-8">
              {/* Basic Textarea */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Basic Textarea</h3>
                <div className="max-w-sm">
                  <Textarea
                    placeholder="Enter your message here"
                    value={textareaValues.basic}
                    onChange={handleTextareaChange("basic")}
                  />
                </div>
              </div>

              {/* Textarea with Label */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">
                  Textarea with Label
                </h3>
                <div className="max-w-sm">
                  <Textarea
                    label="Message"
                    placeholder="Type your message"
                    value={textareaValues.basic}
                    onChange={handleTextareaChange("basic")}
                  />
                </div>
              </div>

              {/* Size Variants */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Size Variants</h3>
                <div className="max-w-sm space-y-4">
                  <Textarea
                    size="sm"
                    placeholder="Small textarea"
                    label="Small Textarea"
                  />
                  <Textarea
                    size="md"
                    placeholder="Medium textarea"
                    label="Medium Textarea"
                  />
                  <Textarea
                    size="lg"
                    placeholder="Large textarea"
                    label="Large Textarea"
                  />
                </div>
              </div>

              {/* Textarea States */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Textarea States</h3>
                <div className="max-w-sm space-y-4">
                  <Textarea
                    label="Error State"
                    placeholder="Error textarea"
                    error="This field contains invalid input"
                    value={textareaValues.error}
                    onChange={handleTextareaChange("error")}
                  />
                  <Textarea
                    label="Disabled State"
                    placeholder="Disabled textarea"
                    disabled
                    value={textareaValues.disabled}
                    onChange={handleTextareaChange("disabled")}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Dropdown Menu Component Demo */}
          <section>
            <h2 className="app-h2 mb-8">Dropdown Menu Component</h2>
            <div className="space-y-8">
              {/* Basic Dropdown */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Basic Dropdown</h3>
                <div className="flex gap-4">
                  <DropdownMenu>
                    <DropdownTrigger>Select Option</DropdownTrigger>
                    <DropdownContent>
                      <DropdownItem
                        onClick={() => handleDropdownAction("option1")}
                      >
                        Option 1
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => handleDropdownAction("option2")}
                      >
                        Option 2
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => handleDropdownAction("option3")}
                      >
                        Option 3
                      </DropdownItem>
                    </DropdownContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Dropdown with Icons */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">
                  Dropdown with Icons
                </h3>
                <div className="flex gap-4">
                  <DropdownMenu>
                    <DropdownTrigger>
                      <User className="w-4 h-4" />
                      Account
                    </DropdownTrigger>
                    <DropdownContent>
                      <DropdownItem
                        icon={<Settings className="w-4 h-4" />}
                        onClick={() => handleDropdownAction("settings")}
                      >
                        Settings
                      </DropdownItem>
                      <DropdownItem
                        icon={<Bell className="w-4 h-4" />}
                        onClick={() => handleDropdownAction("notifications")}
                      >
                        Notifications
                      </DropdownItem>
                      <DropdownItem
                        icon={<Mail className="w-4 h-4" />}
                        onClick={() => handleDropdownAction("messages")}
                      >
                        Messages
                      </DropdownItem>
                      <DropdownDivider />
                      <DropdownItem
                        icon={<LogOut className="w-4 h-4" />}
                        onClick={() => handleDropdownAction("logout")}
                      >
                        Log Out
                      </DropdownItem>
                    </DropdownContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Dropdown with Sections */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">
                  Dropdown with Sections
                </h3>
                <div className="flex gap-4">
                  <DropdownMenu>
                    <DropdownTrigger>Status Updates</DropdownTrigger>
                    <DropdownContent>
                      <DropdownItem
                        icon={<CheckCircle className="w-4 h-4 text-success" />}
                        onClick={() => handleDropdownAction("completed")}
                      >
                        Completed
                      </DropdownItem>
                      <DropdownItem
                        icon={
                          <AlertTriangle className="w-4 h-4 text-warning" />
                        }
                        onClick={() => handleDropdownAction("pending")}
                      >
                        Pending
                      </DropdownItem>
                      <DropdownDivider />
                      <DropdownItem disabled>More Actions</DropdownItem>
                    </DropdownContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </section>

          {/* Card Component Demo */}
          <section>
            <h2 className="app-h2 mb-8">Card Component</h2>
            <div className="space-y-8">
              {/* Basic Card */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Basic Card</h3>
                <div className="max-w-sm">
                  <Card>
                    <CardHeader>Card Title</CardHeader>
                    <CardBody>
                      This is a basic card with header, body, and footer
                      sections. Perfect for displaying structured content.
                    </CardBody>
                    <CardFooter>
                      <Button variant="secondary" size="sm">
                        Cancel
                      </Button>
                      <Button size="sm">Save</Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>

              {/* Info Card */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Info Card</h3>
                <div className="max-w-sm">
                  <Card variant="info">
                    <CardHeader icon={<Info className="w-5 h-5" />}>
                      Important Notice
                    </CardHeader>
                    <CardBody>
                      Your account settings have been updated. Please review the
                      changes and confirm.
                    </CardBody>
                    <CardFooter>
                      <Button size="sm">Review Changes</Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>

              {/* Statistic Card */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Statistic Card</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                  <Card variant="statistic">
                    <CardHeader icon={<BarChart3 className="w-5 h-5" />}>
                      Performance
                    </CardHeader>
                    <CardBody>
                      <CardStat
                        value="2,845"
                        label="Total Views"
                        trend={{ value: 12.5, direction: "up" }}
                      />
                    </CardBody>
                  </Card>
                  <Card variant="statistic">
                    <CardHeader icon={<Bell className="w-5 h-5" />}>
                      Notifications
                    </CardHeader>
                    <CardBody>
                      <CardStat
                        value="184"
                        label="Unread Messages"
                        trend={{ value: 4.2, direction: "down" }}
                      />
                    </CardBody>
                  </Card>
                </div>
              </div>

              {/* Interactive Card */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Interactive Card</h3>
                <div className="max-w-sm">
                  <Card variant="interactive" onClick={handleCardClick}>
                    <CardBody className="flex items-center justify-between">
                      <div>
                        <h4 className="text-app-body font-medium">
                          View All Settings
                        </h4>
                        <p className="text-app-body-sm text-text-secondary">
                          Configure your account preferences
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-text-secondary" />
                    </CardBody>
                  </Card>
                </div>
              </div>

              {/* Card with Image */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Card with Image</h3>
                <div className="max-w-sm">
                  <Card image="https://images.unsplash.com/photo-1522071820081-009f0129c71c">
                    <CardHeader>Team Collaboration</CardHeader>
                    <CardBody>
                      Enhance your team's productivity with our collaborative
                      workspace tools and features.
                    </CardBody>
                    <CardFooter>
                      <Button size="sm">Learn More</Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>

              {/* Compact Card */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Compact Card</h3>
                <div className="max-w-sm">
                  <Card compact>
                    <CardHeader>Quick Summary</CardHeader>
                    <CardBody>
                      A compact card with reduced padding for dense layouts.
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Dialog Component Demo */}
          <section>
            <h2 className="app-h2 mb-8">Dialog Component</h2>
            <div className="space-y-8">
              {/* Basic Dialog */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Basic Dialog</h3>
                <div>
                  <Button onClick={() => openDialog("basic")}>
                    Open Dialog
                  </Button>
                  <Dialog
                    isOpen={dialogs.basic}
                    onClose={() => closeDialog("basic")}
                  >
                    <DialogTitle>Dialog Title</DialogTitle>
                    <DialogBody>
                      This is a basic dialog with a title and some content. You
                      can close it by clicking the X button, clicking outside,
                      or pressing the Escape key.
                    </DialogBody>
                    <DialogFooter>
                      <Button
                        variant="secondary"
                        onClick={() => closeDialog("basic")}
                      >
                        Close
                      </Button>
                    </DialogFooter>
                  </Dialog>
                </div>
              </div>

              {/* Confirmation Dialog */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">
                  Confirmation Dialog
                </h3>
                <div>
                  <Button onClick={() => openDialog("confirmation")}>
                    Delete Item
                  </Button>
                  <Dialog
                    isOpen={dialogs.confirmation}
                    onClose={() => closeDialog("confirmation")}
                  >
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogBody>
                      Are you sure you want to delete this item? This action
                      cannot be undone.
                    </DialogBody>
                    <DialogFooter>
                      <Button
                        variant="secondary"
                        onClick={() => closeDialog("confirmation")}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          console.log("Item deleted");
                          closeDialog("confirmation");
                        }}
                      >
                        Delete
                      </Button>
                    </DialogFooter>
                  </Dialog>
                </div>
              </div>

              {/* Scrollable Dialog */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">
                  Scrollable Dialog
                </h3>
                <div>
                  <Button onClick={() => openDialog("scrollable")}>
                    Open Long Content
                  </Button>
                  <Dialog
                    isOpen={dialogs.scrollable}
                    onClose={() => closeDialog("scrollable")}
                  >
                    <DialogTitle>Terms of Service</DialogTitle>
                    <DialogBody>
                      {Array.from({ length: 15 }, (_, i) => (
                        <p key={i} className="mb-4">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                      ))}
                    </DialogBody>
                    <DialogFooter>
                      <Button
                        variant="secondary"
                        onClick={() => closeDialog("scrollable")}
                      >
                        Close
                      </Button>
                      <Button
                        onClick={() => {
                          console.log("Terms accepted");
                          closeDialog("scrollable");
                        }}
                      >
                        Accept
                      </Button>
                    </DialogFooter>
                  </Dialog>
                </div>
              </div>
            </div>
          </section>

          {/* Accordion Component Demo */}
          <section>
            <h2 className="app-h2 mb-8">Accordion Component</h2>
            <div className="space-y-8">
              {/* Default Accordion */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">
                  Default Accordion
                </h3>
                <Accordion>
                  <AccordionItem title="What is an accordion?">
                    An accordion is a vertically stacked set of interactive
                    headings that each reveal a section of content. It's
                    commonly used to reduce the need to scroll when presenting
                    multiple sections of content on a single page.
                  </AccordionItem>
                  <AccordionItem title="How does it work?">
                    Click on the accordion header to expand or collapse the
                    content. Only one section can be expanded at a time in the
                    default mode. The component is fully accessible and can be
                    navigated using keyboard controls.
                  </AccordionItem>
                  <AccordionItem title="What are the keyboard controls?">
                    Use the up and down arrow keys to navigate between accordion
                    headers. Press Enter or Space to expand/collapse the current
                    section. Use Home to go to the first item and End to go to
                    the last item.
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Multi-Expand Accordion */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">
                  Multi-Expand Accordion
                </h3>
                <Accordion allowMultiple>
                  <AccordionItem title="Multiple sections can be open">
                    In this mode, multiple accordion sections can be expanded
                    simultaneously. This is useful when users need to compare
                    information between sections.
                  </AccordionItem>
                  <AccordionItem title="Independent sections">
                    Each section operates independently, allowing users to
                    expand or collapse sections without affecting others.
                  </AccordionItem>
                  <AccordionItem title="Great for complex content">
                    This mode is particularly useful for displaying complex
                    content where users might need to reference multiple
                    sections at once.
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Borderless Accordion */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">
                  Borderless Accordion
                </h3>
                <Accordion variant="borderless">
                  <AccordionItem title="Clean and minimal">
                    The borderless variant provides a clean, minimal look
                    without dividers between sections.
                  </AccordionItem>
                  <AccordionItem title="Perfect for cards">
                    This style works well when the accordion is placed within a
                    card or another container that already provides visual
                    structure.
                  </AccordionItem>
                  <AccordionItem title="Maintains functionality">
                    While the appearance is different, all the same
                    functionality and accessibility features are maintained.
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section>

          {/* Slider Component Demo */}
          <section>
            <h2 className="app-h2 mb-8">Slider Component</h2>
            <div className="space-y-8">
              {/* Basic Slider */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Basic Slider</h3>
                <div className="max-w-sm">
                  <Slider
                    value={sliderValues.basic}
                    onChange={(value) =>
                      setSliderValues((prev) => ({
                        ...prev,
                        basic: value as number,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Slider with Steps */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">
                  Slider with Steps
                </h3>
                <div className="max-w-sm">
                  <Slider
                    value={sliderValues.withSteps}
                    step={10}
                    onChange={(value) =>
                      setSliderValues((prev) => ({
                        ...prev,
                        withSteps: value as number,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Slider with Labels */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">
                  Slider with Labels
                </h3>
                <div className="max-w-sm">
                  <Slider
                    value={sliderValues.withLabels}
                    showLabels
                    onChange={(value) =>
                      setSliderValues((prev) => ({
                        ...prev,
                        withLabels: value as number,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Range Slider */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Range Slider</h3>
                <div className="max-w-sm">
                  <Slider
                    value={sliderValues.range}
                    showLabels
                    onChange={(value) =>
                      setSliderValues((prev) => ({
                        ...prev,
                        range: value as [number, number],
                      }))
                    }
                  />
                </div>
              </div>

              {/* Disabled Slider */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Disabled Slider</h3>
                <div className="max-w-sm">
                  <Slider
                    value={sliderValues.disabled}
                    disabled
                    onChange={(value) =>
                      setSliderValues((prev) => ({
                        ...prev,
                        disabled: value as number,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Toast Component Demo */}
          <ToastDemo />

          {/* DataTable Component Demo */}
          <section>
            <h2 className="app-h2 mb-8">DataTable Component</h2>
            <div className="space-y-8">
              {/* Basic Table */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Basic Table</h3>
                <DataTable
                  data={[
                    {
                      id: 1,
                      name: "John Doe",
                      email: "john@example.com",
                      role: "Admin",
                    },
                    {
                      id: 2,
                      name: "Jane Smith",
                      email: "jane@example.com",
                      role: "User",
                    },
                    {
                      id: 3,
                      name: "Bob Johnson",
                      email: "bob@example.com",
                      role: "Editor",
                    },
                    {
                      id: 4,
                      name: "Alice Brown",
                      email: "alice@example.com",
                      role: "User",
                    },
                    {
                      id: 5,
                      name: "Charlie Wilson",
                      email: "charlie@example.com",
                      role: "Admin",
                    },
                  ]}
                  columns={[
                    { key: "name", header: "Name", sortable: true },
                    { key: "email", header: "Email" },
                    { key: "role", header: "Role" },
                  ]}
                  keyField="id"
                />
              </div>

              {/* Selectable Table */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Selectable Table</h3>
                <DataTable
                  data={[
                    {
                      id: 1,
                      task: "Complete project",
                      status: "In Progress",
                      dueDate: "2024-03-15",
                    },
                    {
                      id: 2,
                      task: "Review code",
                      status: "Pending",
                      dueDate: "2024-03-16",
                    },
                    {
                      id: 3,
                      task: "Write documentation",
                      status: "Completed",
                      dueDate: "2024-03-14",
                    },
                    {
                      id: 4,
                      task: "Test features",
                      status: "In Progress",
                      dueDate: "2024-03-17",
                    },
                    {
                      id: 5,
                      task: "Deploy updates",
                      status: "Pending",
                      dueDate: "2024-03-18",
                    },
                  ]}
                  columns={[
                    { key: "task", header: "Task", sortable: true },
                    { key: "status", header: "Status" },
                    { key: "dueDate", header: "Due Date", sortable: true },
                  ]}
                  keyField="id"
                  selectable
                  onSelectionChange={(selectedRows) =>
                    console.log("Selected:", selectedRows)
                  }
                />
              </div>

              {/* Expandable Table */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Expandable Table</h3>
                <DataTable
                  data={[
                    {
                      id: 1,
                      product: "Laptop Pro",
                      price: 1299,
                      stock: 45,
                      description:
                        "High-performance laptop with 16GB RAM and 512GB SSD",
                    },
                    {
                      id: 2,
                      product: "Wireless Mouse",
                      price: 49,
                      stock: 120,
                      description:
                        "Ergonomic wireless mouse with long battery life",
                    },
                    {
                      id: 3,
                      product: "4K Monitor",
                      price: 699,
                      stock: 30,
                      description: "32-inch 4K monitor with HDR support",
                    },
                  ]}
                  columns={[
                    { key: "product", header: "Product", sortable: true },
                    {
                      key: "price",
                      header: "Price",
                      sortable: true,
                      render: (value) => `$${value.toLocaleString()}`,
                    },
                    { key: "stock", header: "Stock", sortable: true },
                  ]}
                  keyField="id"
                  expandable
                  renderExpandedRow={(row) => (
                    <div className="text-app-body-sm text-text-secondary">
                      <strong>Description:</strong> {row.description}
                    </div>
                  )}
                />
              </div>

              {/* Full-Featured Table */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">
                  Full-Featured Table
                </h3>
                <DataTable
                  data={[
                    {
                      id: 1,
                      name: "Project Alpha",
                      status: "Active",
                      members: 5,
                      progress: 75,
                    },
                    {
                      id: 2,
                      name: "Project Beta",
                      status: "On Hold",
                      members: 3,
                      progress: 45,
                    },
                    {
                      id: 3,
                      name: "Project Gamma",
                      status: "Completed",
                      members: 4,
                      progress: 100,
                    },
                    {
                      id: 4,
                      name: "Project Delta",
                      status: "Active",
                      members: 6,
                      progress: 60,
                    },
                    {
                      id: 5,
                      name: "Project Epsilon",
                      status: "On Hold",
                      members: 2,
                      progress: 30,
                    },
                  ]}
                  columns={[
                    { key: "name", header: "Project Name", sortable: true },
                    { key: "status", header: "Status", sortable: true },
                    { key: "members", header: "Team Size", sortable: true },
                    {
                      key: "progress",
                      header: "Progress",
                      sortable: true,
                      render: (value) => (
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-neutral-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${value}%` }}
                            />
                          </div>
                          <span>{value}%</span>
                        </div>
                      ),
                    },
                  ]}
                  keyField="id"
                  alternateRowBackground
                  selectable
                  expandable
                  renderExpandedRow={(row) => (
                    <div className="space-y-2">
                      <div className="text-app-body-sm">
                        <strong>Project Details:</strong> Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit.
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary">
                          View Details
                        </Button>
                        <Button size="sm">Edit Project</Button>
                      </div>
                    </div>
                  )}
                  onSelectionChange={(selectedRows) =>
                    console.log("Selected:", selectedRows)
                  }
                  onRowClick={(row) => console.log("Clicked:", row)}
                />
              </div>

              {/* Features Description */}
              <div className="space-y-2">
                <h3 className="app-h3 text-text-secondary">Features</h3>
                <ul className="list-disc list-inside space-y-2 text-app-body-sm">
                  <li>
                    Sortable columns with ascending/descending/none states
                  </li>
                  <li>Row selection with checkboxes and bulk selection</li>
                  <li>Expandable rows with custom content</li>
                  <li>Pagination with Previous/Next navigation</li>
                  <li>Alternating row backgrounds (optional)</li>
                  <li>Custom cell rendering</li>
                  <li>Responsive design with horizontal scrolling</li>
                  <li>Fully typed with TypeScript</li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </ToastProvider>
  );
}

function ToastDemo() {
  const { addToast, setPosition } = useToast();

  const showSuccessToast = () => {
    addToast({
      type: "success",
      title: "Success",
      message: "Your changes have been saved successfully.",
    });
  };

  const showWarningToast = () => {
    addToast({
      type: "warning",
      title: "Warning",
      message: "Your session will expire in 5 minutes.",
      duration: 5000,
    });
  };

  const showErrorToast = () => {
    addToast({
      type: "error",
      title: "Error",
      message: "Failed to save changes. Please try again.",
      duration: Infinity,
    });
  };

  const showInfoToast = () => {
    addToast({
      type: "info",
      message: "A new version is available.",
      action: {
        label: "Update Now",
        onClick: () => console.log("Update clicked"),
      },
    });
  };

  return (
    <section>
      <h2 className="app-h2 mb-8">Toast Component</h2>
      <div className="space-y-8">
        {/* Toast Types */}
        <div className="space-y-2">
          <h3 className="app-h3 text-text-secondary">Toast Types</h3>
          <div className="flex flex-wrap gap-4">
            <Button onClick={showSuccessToast}>Show Success Toast</Button>
            <Button onClick={showWarningToast}>Show Warning Toast</Button>
            <Button onClick={showErrorToast}>Show Error Toast</Button>
            <Button onClick={showInfoToast}>Show Info Toast</Button>
          </div>
        </div>

        {/* Toast Positions */}
        <div className="space-y-2">
          <h3 className="app-h3 text-text-secondary">Toast Positions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Button
              variant="secondary"
              onClick={() => setPosition("top-right")}
            >
              Top Right
            </Button>
            <Button variant="secondary" onClick={() => setPosition("top-left")}>
              Top Left
            </Button>
            <Button
              variant="secondary"
              onClick={() => setPosition("top-center")}
            >
              Top Center
            </Button>
            <Button
              variant="secondary"
              onClick={() => setPosition("bottom-right")}
            >
              Bottom Right
            </Button>
            <Button
              variant="secondary"
              onClick={() => setPosition("bottom-left")}
            >
              Bottom Left
            </Button>
            <Button
              variant="secondary"
              onClick={() => setPosition("bottom-center")}
            >
              Bottom Center
            </Button>
          </div>
        </div>

        {/* Features Description */}
        <div className="space-y-2">
          <h3 className="app-h3 text-text-secondary">Features</h3>
          <ul className="list-disc list-inside space-y-2 text-app-body-sm">
            <li>Auto-dismisses after 3 seconds (default)</li>
            <li>Warning toast stays for 5 seconds</li>
            <li>Error toast requires manual dismissal</li>
            <li>Info toast includes an action button</li>
            <li>Supports multiple toasts stacked</li>
            <li>Smooth enter/exit animations</li>
            <li>Fully responsive design</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
