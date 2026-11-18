import type { Testimonial } from "@/lib/content/schemas";

// Recovered from the archived WordPress build of theindustryleader.net
// (Wayback Machine capture, 21 March 2026). Quotes are the published originals;
// confirm re-publication permission with each client before launch.
export const testimonials: Testimonial[] = [
  {
    id: "testimonial-bankole",
    quote:
      "Matthew is a phenomenon when it comes to leadership development. He has achieved incredible feats, and I have enjoyed sessions that have further developed my leadership capabilities under his program.",
    author: "Bankole Adewumi",
    role: "AVP Data Governance",
    company: "State Street",
    location: "Boston, MA",
    image: "/images/testimonials/bankole.jpg",
    featured: true,
    programSlug: "becoming-an-industry-leader",
    tags: ["leadership"],
    order: 0,
  },
  {
    id: "testimonial-donald",
    quote:
      "Matthew is practical and has set me up to achieve my corporate objectives for my business startup and leadership. We're on a path to sustainable growth. If you want to experience the same, I recommend Matthew for your leadership development.",
    author: "Donald Niesig",
    role: "Owner & CEO",
    company: "HevyD's Keys Services",
    location: "New Bedford, MA",
    image: "/images/testimonials/donald.jpg",
    featured: false,
    programSlug: "becoming-an-industry-leader",
    tags: ["founder"],
    order: 1,
  },
  {
    id: "testimonial-stephen",
    quote:
      "Matthew understands leadership and how to influence people. He will train you on this. Matthew also helps with people management and client relationships. Matthew has a beautiful approach, and he is so in-depth and comprehensive.",
    author: "Stephen Parilla",
    role: "Owner",
    company: "Restaurant",
    location: "Canton, MA",
    image: "/images/testimonials/stephen.jpg",
    featured: false,
    programSlug: "becoming-an-industry-leader",
    tags: ["founder"],
    order: 2,
  },
];
