"use client";

import {
  Dialog,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "../components/Dialog";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Textarea } from "../components/Textarea";
import { useState } from "react";

export function DialogDemo() {
  const [dialogs, setDialogs] = useState({
    basic: false,
    confirmation: false,
    scrollable: false,
    form: false,
  });

  const openDialog = (key: keyof typeof dialogs) => {
    setDialogs((prev) => ({ ...prev, [key]: true }));
  };

  const closeDialog = (key: keyof typeof dialogs) => {
    setDialogs((prev) => ({ ...prev, [key]: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
    closeDialog("form");
  };

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Dialog</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Displays a modal dialog for important content and actions.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Usage</h3>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => openDialog("basic")}>Open Dialog</Button>

          <Dialog isOpen={dialogs.basic} onClose={() => closeDialog("basic")}>
            <DialogTitle>
              <h3 className="text-app-h4 font-medium">Dialog Title</h3>
            </DialogTitle>
            <DialogBody>
              <p>This is a basic dialog with a title and some content.</p>
            </DialogBody>
            <DialogFooter>
              <Button variant="secondary" onClick={() => closeDialog("basic")}>
                Close
              </Button>
              <Button onClick={() => closeDialog("basic")}>Save</Button>
            </DialogFooter>
          </Dialog>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Confirmation Dialog</h3>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="destructive"
            onClick={() => openDialog("confirmation")}
          >
            Delete Item
          </Button>

          <Dialog
            isOpen={dialogs.confirmation}
            onClose={() => closeDialog("confirmation")}
          >
            <DialogTitle>
              <h3 className="text-app-h4 font-medium">Confirm Deletion</h3>
            </DialogTitle>
            <DialogBody>
              <p>
                Are you sure you want to delete this item? This action cannot be
                undone.
              </p>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => closeDialog("confirmation")}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => closeDialog("confirmation")}
              >
                Delete
              </Button>
            </DialogFooter>
          </Dialog>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Scrollable Content</h3>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => openDialog("scrollable")}>
            Open Large Dialog
          </Button>

          <Dialog
            isOpen={dialogs.scrollable}
            onClose={() => closeDialog("scrollable")}
          >
            <DialogTitle>
              <h3 className="text-app-h4 font-medium">Terms of Service</h3>
            </DialogTitle>
            <DialogBody>
              <div className="space-y-4">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur.
                </p>
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium.
                </p>
                <p>
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                  odit aut fugit.
                </p>
                <p>
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                  amet, consectetur, adipisci velit.
                </p>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => closeDialog("scrollable")}
              >
                Close
              </Button>
              <Button onClick={() => closeDialog("scrollable")}>Accept</Button>
            </DialogFooter>
          </Dialog>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Form Dialog</h3>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => openDialog("form")}>Open Form Dialog</Button>

          <Dialog
            variant="form"
            isOpen={dialogs.form}
            onClose={() => closeDialog("form")}
          >
            <form onSubmit={handleSubmit}>
              <DialogTitle>
                <h3 className="text-lg font-semibold text-text-primary">
                  Contact Form
                </h3>
                <p className="text-text-secondary">
                  Fill in your details below
                </p>
              </DialogTitle>
              <DialogBody>
                <div>
                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <Textarea
                    label="Message"
                    placeholder="Enter your message"
                    required
                  />
                </div>
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => closeDialog("form")}
                >
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
