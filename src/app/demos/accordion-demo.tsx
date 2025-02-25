"use client";

import { Accordion, AccordionItem } from "../components/Accordion";

export function AccordionDemo() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Accordion</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Vertically stacked sections of content that can be expanded/collapsed.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Usage</h3>
        <div className="max-w-xl">
          <Accordion>
            <AccordionItem title="What is this component?">
              <p>
                The Accordion component is a vertically stacked set of
                interactive headings that each reveal a section of content.
              </p>
            </AccordionItem>
            <AccordionItem title="When should I use it?">
              <p>
                Use an accordion when you want to toggle between hiding and
                showing large amounts of content, especially in limited spaces.
              </p>
            </AccordionItem>
            <AccordionItem title="How does it work?">
              <p>
                Click on the header to expand or collapse the content. Only one
                section can be open at a time by default.
              </p>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Allow Multiple</h3>
        <div className="max-w-xl">
          <Accordion allowMultiple>
            <AccordionItem title="First Section">
              <p>
                This accordion allows multiple sections to be expanded at the
                same time. Try clicking on another section without closing this
                one.
              </p>
            </AccordionItem>
            <AccordionItem title="Second Section">
              <p>
                You can have multiple sections open simultaneously. This is
                useful when users need to compare content between sections.
              </p>
            </AccordionItem>
            <AccordionItem title="Third Section">
              <p>
                Each section operates independently, allowing for a more
                flexible user experience when needed.
              </p>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Default Expanded</h3>
        <div className="max-w-xl">
          <Accordion defaultExpanded={["section1"]}>
            <AccordionItem title="Pre-expanded Section">
              <p>
                This section is expanded by default when the accordion is first
                rendered.
              </p>
            </AccordionItem>
            <AccordionItem title="Collapsed Section">
              <p>
                This section starts collapsed but can be expanded by clicking on
                the header.
              </p>
            </AccordionItem>
            <AccordionItem title="Another Section">
              <p>
                You can specify which sections should be expanded by default
                using the defaultExpanded prop.
              </p>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Borderless Variant</h3>
        <div className="max-w-xl">
          <Accordion variant="borderless">
            <AccordionItem title="Clean Design">
              <p>
                This variant removes borders between items for a cleaner, more
                minimal appearance.
              </p>
            </AccordionItem>
            <AccordionItem title="Subtle Separation">
              <p>
                Items are separated by spacing rather than borders, creating a
                lighter visual hierarchy.
              </p>
            </AccordionItem>
            <AccordionItem title="Modern Look">
              <p>
                The borderless variant is perfect for modern, minimalist
                interfaces.
              </p>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
