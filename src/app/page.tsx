"use client";

import { ButtonDemo } from "./demos/button-demo";
import { SwitchDemo } from "./demos/switch-demo";
import { CheckboxDemo } from "./demos/checkbox-demo";
import { RadioGroupDemo } from "./demos/radio-group-demo";
import { TabsDemo } from "./demos/tabs-demo";
import { AlertDemo } from "./demos/alert-demo";
import { AvatarDemo } from "./demos/avatar-demo";
import { BadgeDemo } from "./demos/badge-demo";
import { InputDemo } from "./demos/input-demo";
import { TextareaDemo } from "./demos/textarea-demo";
import { DropdownMenuDemo } from "./demos/dropdown-menu-demo";
import { CardDemo } from "./demos/card-demo";
import { DialogDemo } from "./demos/dialog-demo";
import { AccordionDemo } from "./demos/accordion-demo";
import { SliderDemo } from "./demos/slider-demo";
import { DataTableDemo } from "./demos/data-table-demo";
import { ToastDemo } from "./demos/toast-demo";
import { ToastProvider } from "./components/Toast";

export default function Home() {
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

          {/* Component Demos */}
          <ButtonDemo />
          <SwitchDemo />
          <CheckboxDemo />
          <RadioGroupDemo />
          <TabsDemo />
          <AlertDemo />
          <AvatarDemo />
          <BadgeDemo />
          <InputDemo />
          <TextareaDemo />
          <DropdownMenuDemo />
          <CardDemo />
          <DialogDemo />
          <AccordionDemo />
          <SliderDemo />
          <DataTableDemo />
          <ToastDemo />
        </main>
      </div>
    </ToastProvider>
  );
}
