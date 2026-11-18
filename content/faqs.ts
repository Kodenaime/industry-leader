import type { Faq } from "@/lib/content/schemas";

// Seed FAQs. Review answers with the client before launch.
export const faqs: Faq[] = [
  {
    id: "faq-who",
    question: "Who is this program for?",
    answer:
      "The program is built for ambitious managers, executives, founders, and professionals who are already capable but not yet recognized as authorities in their field.",
    order: 0,
  },
  {
    id: "faq-format",
    question: "How is the program delivered?",
    answer:
      "Becoming an Industry Leader is a private 1:1 coaching program delivered over eight weeks through eight 60-minute sessions, supported by a leadership diagnostic, templates, and between-session support.",
    order: 1,
  },
  {
    id: "faq-time",
    question: "How much time should I expect to commit?",
    answer:
      "Plan for the weekly coaching session plus focused application work between sessions. The work is designed to fit alongside a demanding role while still creating real momentum.",
    order: 2,
  },
  {
    id: "faq-investment",
    question: "What does the program cost?",
    answer:
      "The program is application-only. Investment and start date are discussed on your discovery call so the fit and scope can be confirmed first.",
    order: 3,
  },
  {
    id: "faq-outcomes",
    question: "What will I have by the end?",
    answer:
      "You will leave with a clear leadership identity, a sharper point of view, stronger presence and influence, and a concrete 90-day plan to put it into action.",
    order: 4,
  },
  {
    id: "faq-apply",
    question: "How do I apply?",
    answer:
      "Complete the short application form and book a discovery call. The call is where we confirm whether the program is the right next step for you.",
    order: 5,
  },
];
