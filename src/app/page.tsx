"use client";

import { useState, useEffect } from "react";
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
import { WalletConnectionDemo } from "./demos/wallet-connection-demo";
import { AssetInputDemo } from "./demos/asset-input-demo";
import { Button } from "./components/Button";
import Link from "next/link";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ToastProvider>
      <div className="min-h-screen p-8 sm:p-20">
        <main className="max-w-5xl mx-auto space-y-20">
          {/* Header with Navigation */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="app-h1">Plume UI</h1>
            <Link href="/staking">
              <Button variant="primary" size="lg">
                Staking Dashboard
              </Button>
            </Link>
          </div>

          {mounted ? (
            <>
              {/* Component Demos */}
              <WalletConnectionDemo />
              <ButtonDemo />
              <AssetInputDemo />
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
            </>
          ) : (
            <div className="animate-pulse space-y-8">
              <div className="h-64 bg-surface-secondary rounded-lg"></div>
              <div className="h-96 bg-surface-secondary rounded-lg"></div>
              <div className="h-64 bg-surface-secondary rounded-lg"></div>
            </div>
          )}
        </main>
      </div>
    </ToastProvider>
  );
}
