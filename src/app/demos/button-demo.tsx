"use client";

import { Button } from "../components/Button";
import { ArrowRight, Settings, Bell, User, LogOut, Mail } from "lucide-react";

export function ButtonDemo() {
  return (
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

        {/* Destructive Buttons */}
        <div className="space-y-2">
          <h3 className="app-h3 text-text-secondary">Destructive Buttons</h3>
          <div className="flex gap-4 items-center">
            <Button variant="destructive" size="sm">
              Delete
            </Button>
            <Button variant="destructive" size="md">
              Delete
            </Button>
            <Button variant="destructive" size="lg">
              Delete
            </Button>
          </div>
        </div>

        {/* Buttons with Icons */}
        <div className="space-y-2">
          <h3 className="app-h3 text-text-secondary">Buttons with Icons</h3>
          <div className="flex gap-4 items-center">
            <Button size="sm" iconLeft={ArrowRight}>
              Continue
            </Button>
            <Button size="md" iconLeft={Settings}>
              Settings
            </Button>
            <Button size="lg" iconLeft={Mail}>
              Send Message
            </Button>
          </div>
        </div>

        {/* Icon-Only Buttons */}
        <div className="space-y-2">
          <h3 className="app-h3 text-text-secondary">Icon-Only Buttons</h3>
          <div className="flex gap-4 items-center">
            <Button
              size="sm"
              iconLeft={Settings}
              iconOnly
              aria-label="Settings"
            />
            <Button
              size="md"
              iconLeft={Bell}
              iconOnly
              aria-label="Notifications"
            />
            <Button
              size="lg"
              iconLeft={User}
              iconOnly
              aria-label="User Profile"
            />
            <Button
              variant="secondary"
              size="md"
              iconLeft={Mail}
              iconOnly
              aria-label="Messages"
            />
            <Button
              variant="destructive"
              size="md"
              iconLeft={LogOut}
              iconOnly
              aria-label="Log Out"
            />
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
            <Button disabled size="md" iconLeft={Settings}>
              Settings
            </Button>
            <Button
              disabled
              size="md"
              iconLeft={Bell}
              iconOnly
              aria-label="Notifications"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
