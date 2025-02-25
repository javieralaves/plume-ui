"use client";

import { Avatar } from "../components/Avatar";

export function AvatarDemo() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Avatar</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Displays a user avatar image or fallback initials.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Size Variants</h3>
        <div className="flex items-center gap-4">
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="John Doe"
            size="sm"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="John Doe"
            size="md"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="John Doe"
            size="lg"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">With Initials</h3>
        <div className="flex items-center gap-4">
          <Avatar initials="JD" size="sm" />
          <Avatar initials="JS" size="md" />
          <Avatar initials="RJ" size="lg" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Fallback Icon</h3>
        <div className="flex items-center gap-4">
          <Avatar size="sm" />
          <Avatar size="md" />
          <Avatar size="lg" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Custom Background</h3>
        <div className="flex items-center gap-4">
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="John Doe"
            size="md"
            className="bg-primary"
          />
          <Avatar initials="JS" size="md" className="bg-success-light" />
        </div>
      </div>
    </section>
  );
}
