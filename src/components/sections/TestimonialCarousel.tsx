import { TestimonialCard } from "@/components/content/TestimonialCard";
import type { Testimonial } from "@/lib/content/schemas";

/**
 * Static testimonial rail. Small screens scroll horizontally with native
 * touch/keyboard scrolling; large screens show a three-column grid. No client
 * JavaScript or carousel state is required.
 */
export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div role="region" aria-label="Client testimonials" className="relative">
      <div
        id="testimonial-track"
        tabIndex={0}
        aria-label="Testimonials. Scroll horizontally on smaller screens."
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-4 focus-visible:ring-offset-mist lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0"
        style={{ scrollbarWidth: "none" }}
      >
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-auto lg:min-w-0"
          >
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-stone lg:hidden">Swipe to read more.</p>
    </div>
  );
}
