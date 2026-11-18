import type { AboutPage } from "@/lib/content/schemas";

// Approved directional copy from plan.md. Confirm biographical details with the client.
export const aboutPage: AboutPage = {
  eyebrow: "About Matthew",
  headline: "A practitioner, not just a theorist.",
  intro:
    "Matthew Ogieva is a leadership coach, author, and founder of Business Reimagined Incorporated. He works with capable professionals who want to turn expertise into authority — and authority into lasting impact.",
  story: [
    "Matthew's career began on the operational side of global trade: on the docks, inside the systems, and close to the work that moves goods across borders. He trained as an engineer, then spent more than 25 years leading teams and advising leaders across four continents.",
    "That path took him through large operations such as Maersk and APM Terminals, where he learned how strategy actually lands — or fails to land — at the operational level. It also showed him that the gap between capable professionals and recognized leaders is rarely about technical skill.",
    "Through Egogo, Business Reimagined, and Asaph Services, he has worked with founders, executives, and senior managers on the questions that decide careers: what do you stand for, who needs to hear it, and how do you show up when the stakes are high?",
    "He is a TEDx speaker and the author of Conveying Influence. His coaching is direct, practical, and grounded in the belief that influence is not control. It is the earned ability to move people toward something worth building.",
  ],
  pullQuote: "Capability gets you into the room. Influence makes you the leader in it.",
  philosophy: [
    {
      title: "Clarity",
      body: "Leadership begins with knowing what you believe and what you are asking others to follow. We start there, before tactics.",
    },
    {
      title: "Credibility",
      body: "Authority is earned through consistent judgment, honest communication, and work that holds up under scrutiny.",
    },
    {
      title: "Connection",
      body: "Influence is not control. It is the ability to build trust with people who have choices and to move them toward something worth building.",
    },
  ],
  timeline: [
    {
      period: "Early career",
      title: "Operations and engineering",
      description:
        "Technical and operational leadership on the docks and inside global trade systems, close to the consequences of every decision.",
    },
    {
      period: "25+ years",
      title: "Maersk and APM Terminals",
      description:
        "Leading teams and advising leaders across four continents inside large, complex operations.",
    },
    {
      period: "Venture and advisory",
      title: "Egogo, Asaph Services, and Business Reimagined",
      description:
        "Founder and advisor work spanning commercial growth, organizational change, and leadership development.",
    },
    {
      period: "Today",
      title: "Coaching, writing, and speaking",
      description:
        "TEDx speaker and author of Conveying Influence, coaching professionals through Becoming an Industry Leader.",
    },
  ],
};
