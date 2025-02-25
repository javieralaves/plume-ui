"use client";

import {
  DropdownMenu,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownDivider,
} from "../components/DropdownMenu";
import { Button } from "../components/Button";
import { Settings, User, LogOut, Bell } from "lucide-react";
import { useState } from "react";

export function DropdownMenuDemo() {
  const [activeView, setActiveView] = useState("grid");
  const [selectedTheme, setSelectedTheme] = useState("light");

  const handleAction = (action: string) => {
    console.log(`Dropdown action: ${action}`);
  };

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Dropdown Menu</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Displays a menu of actions or options.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Usage</h3>
        <div className="flex items-start gap-4">
          <DropdownMenu>
            <DropdownTrigger>
              <Button variant="select">Open Menu</Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem onClick={() => handleAction("profile")}>
                Profile
              </DropdownItem>
              <DropdownItem onClick={() => handleAction("settings")}>
                Settings
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={() => handleAction("logout")}>
                Log out
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">With Active Selection</h3>
        <div className="flex items-start gap-4">
          <DropdownMenu>
            <DropdownTrigger>
              <Button variant="select">View Options</Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem
                onClick={() => setActiveView("grid")}
                isActive={activeView === "grid"}
              >
                Grid View
              </DropdownItem>
              <DropdownItem
                onClick={() => setActiveView("list")}
                isActive={activeView === "list"}
              >
                List View
              </DropdownItem>
              <DropdownItem
                onClick={() => setActiveView("board")}
                isActive={activeView === "board"}
              >
                Board View
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownTrigger>
              <Button variant="select">Theme</Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem
                onClick={() => setSelectedTheme("light")}
                isActive={selectedTheme === "light"}
              >
                Light
              </DropdownItem>
              <DropdownItem
                onClick={() => setSelectedTheme("dark")}
                isActive={selectedTheme === "dark"}
              >
                Dark
              </DropdownItem>
              <DropdownItem
                onClick={() => setSelectedTheme("system")}
                isActive={selectedTheme === "system"}
              >
                System
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">With Icons</h3>
        <div className="flex items-start gap-4">
          <DropdownMenu>
            <DropdownTrigger>
              <Button variant="select">Menu with Icons</Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem
                onClick={() => handleAction("profile")}
                icon={<User className="w-4 h-4" />}
              >
                Profile
              </DropdownItem>
              <DropdownItem
                onClick={() => handleAction("settings")}
                icon={<Settings className="w-4 h-4" />}
              >
                Settings
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem
                onClick={() => handleAction("logout")}
                icon={<LogOut className="w-4 h-4" />}
              >
                Log out
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Different Triggers</h3>
        <div className="flex items-start gap-4">
          <DropdownMenu>
            <DropdownTrigger>
              <Button variant="secondary" iconOnly iconLeft={Bell}>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem onClick={() => handleAction("notification1")}>
                New message from Jane
              </DropdownItem>
              <DropdownItem onClick={() => handleAction("notification2")}>
                Your order has shipped
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={() => handleAction("all")}>
                View all notifications
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownTrigger>
              <Button variant="select">More Options</Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem onClick={() => handleAction("edit")}>
                Edit
              </DropdownItem>
              <DropdownItem onClick={() => handleAction("duplicate")}>
                Duplicate
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={() => handleAction("delete")}>
                Delete
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </div>
      </div>
    </section>
  );
}
