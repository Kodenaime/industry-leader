import * as React from "react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  className?: string;
  defaultOpenIds?: string[];
  allowMultiple?: boolean;
}

/**
 * Native disclosure accordion. Using `<details>`/`<summary>` keeps the
 * component fully keyboard and screen-reader accessible without shipping
 * hydration JavaScript, which keeps FAQ and curriculum sections cheap.
 */
export function Accordion({
  items,
  className,
  defaultOpenIds = [],
  allowMultiple = false,
}: AccordionProps) {
  return (
    <div className={cn("divide-y divide-line rounded border border-line bg-cloud", className)}>
      {items.map((item) => {
        const isOpen = defaultOpenIds.includes(item.id);
        return (
          <details
            key={item.id}
            id={`accordion-${item.id}`}
            open={isOpen || undefined}
            name={allowMultiple ? undefined : "accordion"}
            className="group"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-ink transition-colors hover:bg-mist/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold-deep sm:px-6 [&::-webkit-details-marker]:hidden">
              <span>{item.title}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 shrink-0 text-stone transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <div className="px-5 pb-5 pt-0 text-graphite sm:px-6 sm:pb-6">{item.content}</div>
          </details>
        );
      })}
    </div>
  );
}
