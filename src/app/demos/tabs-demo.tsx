"use client";

import { useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "../components/Tabs";

export function TabsDemo() {
  const [activeTab, setActiveTab] = useState({
    size: "tab1",
    modern: "tab1",
    traditional: "tab1",
    demo: "tab1",
  });

  return (
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
                hugContent
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
                hugContent
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

        {/* Layout Options */}
        <div className="space-y-2">
          <h3 className="app-h3 text-text-secondary">Layout Options</h3>
          <div className="space-y-8">
            <div>
              <h4 className="text-app-body font-medium mb-4">Hug Content</h4>
              <Tabs
                value={activeTab.demo}
                onChange={(value) =>
                  setActiveTab((prev) => ({ ...prev, demo: value }))
                }
                hugContent
              >
                <TabList>
                  <Tab value="tab1">Short</Tab>
                  <Tab value="tab2">Longer Tab</Tab>
                  <Tab value="tab3">Very Long Tab Name</Tab>
                </TabList>
                <TabPanel value="tab1">
                  <p>Content for tab 1</p>
                </TabPanel>
                <TabPanel value="tab2">
                  <p>Content for tab 2</p>
                </TabPanel>
                <TabPanel value="tab3">
                  <p>Content for tab 3</p>
                </TabPanel>
              </Tabs>
            </div>

            <div>
              <h4 className="text-app-body font-medium mb-4">Full Width</h4>
              <div className="border border-border-light rounded-lg p-4">
                <Tabs
                  value={activeTab.demo}
                  onChange={(value) =>
                    setActiveTab((prev) => ({ ...prev, demo: value }))
                  }
                  fullWidth
                >
                  <TabList>
                    <Tab value="tab1">First Tab</Tab>
                    <Tab value="tab2">Second Tab</Tab>
                    <Tab value="tab3">Third Tab</Tab>
                  </TabList>
                  <TabPanel value="tab1">
                    <p>Content for tab 1</p>
                  </TabPanel>
                  <TabPanel value="tab2">
                    <p>Content for tab 2</p>
                  </TabPanel>
                  <TabPanel value="tab3">
                    <p>Content for tab 3</p>
                  </TabPanel>
                </Tabs>
              </div>
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
  );
}
