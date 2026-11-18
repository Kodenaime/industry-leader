import type { Author } from "@/lib/content/schemas";

// Seed content. Verify every biographical claim with the client before launch.
export const author: Author = {
  id: "matthew-ogieva",
  name: "Matthew Ogieva",
  credentials: [
    "25+ years across four continents",
    "TEDx speaker",
    "Author of Conveying Influence",
  ],
  shortBio:
    "Leadership coach and author helping capable professionals turn expertise into authority, influence, and lasting impact.",
  longBio:
    "Matthew Ogieva is the founder of Business Reimagined Incorporated and the coach behind Becoming an Industry Leader. His work sits at the intersection of engineering discipline, commercial leadership, and executive communication.\n\nAcross more than 25 years and four continents, he has led teams and advised leaders inside large operations such as Maersk and APM Terminals, scaled ventures through Egogo, and built advisory work through Business Reimagined and Asaph Services.\n\nHe is a TEDx speaker and the author of Conveying Influence. His coaching philosophy is grounded in a simple idea: capability gets you into the room, but influence makes you the leader in it.",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
  books: [{ title: "Conveying Influence" }],
  talks: [{ title: "TEDx talk" }],
  organizations: [
    "Maersk",
    "APM Terminals",
    "Egogo",
    "Business Reimagined",
    "Asaph Services",
    "TEDx",
  ],
};
