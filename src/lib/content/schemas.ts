import { z } from "zod";

export const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});
export type Seo = z.infer<typeof seoSchema>;

export const socialLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().url(),
});
export type SocialLink = z.infer<typeof socialLinkSchema>;

export const siteSettingsSchema = z.object({
  name: z.string().min(1),
  legalName: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  url: z.string().url(),
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string().min(1),
  bookingUrl: z.string().url().optional(),
  socials: z.array(socialLinkSchema),
  formEndpoints: z
    .object({
      contact: z.string().url().optional(),
      application: z.string().url().optional(),
      newsletter: z.string().url().optional(),
      guide: z.string().url().optional(),
    })
    .optional(),
  analyticsId: z.string().optional(),
});
export type SiteSettings = z.infer<typeof siteSettingsSchema>;

export const bookSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  url: z.string().url().optional(),
});
export type Book = z.infer<typeof bookSchema>;

export const talkSchema = z.object({
  title: z.string().min(1),
  event: z.string().optional(),
  year: z.string().optional(),
  url: z.string().url().optional(),
});
export type Talk = z.infer<typeof talkSchema>;

export const authorSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  credentials: z.array(z.string().min(1)),
  shortBio: z.string().min(1),
  longBio: z.string().min(1),
  portrait: z.string().optional(),
  email: z.string().email().optional(),
  socials: z.array(socialLinkSchema),
  books: z.array(bookSchema),
  talks: z.array(talkSchema),
  organizations: z.array(z.string().min(1)).default([]),
});
export type Author = z.infer<typeof authorSchema>;

export const curriculumWeekSchema = z.object({
  id: z.string().min(1),
  week: z.number().int().positive(),
  title: z.string().min(1),
  summary: z.string().min(1),
  outcomes: z.array(z.string().min(1)),
});
export type CurriculumWeek = z.infer<typeof curriculumWeekSchema>;

export const programSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  eyebrow: z.string().min(1),
  headline: z.string().min(1),
  subheadline: z.string().min(1),
  description: z.string().min(1),
  duration: z.string().min(1),
  format: z.string().min(1),
  audience: z.array(z.string().min(1)),
  notFor: z.array(z.string().min(1)).default([]),
  outcomes: z.array(z.string().min(1)),
  curriculum: z.array(curriculumWeekSchema),
  includes: z.array(z.string().min(1)),
  investmentNote: z.string().min(1),
  ctaLabel: z.string().min(1),
  ctaHref: z.string().min(1),
  faqIds: z.array(z.string().min(1)),
  seo: seoSchema.optional(),
});
export type Program = z.infer<typeof programSchema>;

export const testimonialSchema = z.object({
  id: z.string().min(1),
  quote: z.string().min(1),
  author: z.string().min(1),
  role: z.string().min(1),
  company: z.string().min(1),
  location: z.string().optional(),
  image: z.string().optional(),
  featured: z.boolean().default(false),
  programSlug: z.string().optional(),
  tags: z.array(z.string().min(1)),
  order: z.number().int().nonnegative(),
});
export type Testimonial = z.infer<typeof testimonialSchema>;

export const categorySchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
});
export type Category = z.infer<typeof categorySchema>;

export const faqSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
  category: z.string().optional(),
  order: z.number().int().nonnegative(),
});
export type Faq = z.infer<typeof faqSchema>;

export const leadMagnetSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  description: z.string().min(1),
  coverImage: z.string().optional(),
  bullets: z.array(z.string().min(1)),
  formEndpoint: z.string().url().optional(),
  downloadUrl: z.string().optional(),
  seo: seoSchema.optional(),
});
export type LeadMagnet = z.infer<typeof leadMagnetSchema>;

export const legalPageSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  lastUpdated: z.string().min(1),
});
export type LegalPage = z.infer<typeof legalPageSchema>;

export const aboutPageSchema = z.object({
  eyebrow: z.string().min(1),
  headline: z.string().min(1),
  intro: z.string().min(1),
  story: z.array(z.string().min(1)).min(1),
  pullQuote: z.string().min(1),
  philosophy: z
    .array(
      z.object({
        title: z.string().min(1),
        body: z.string().min(1),
      }),
    )
    .min(1),
  timeline: z
    .array(
      z.object({
        period: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .min(1),
});
export type AboutPage = z.infer<typeof aboutPageSchema>;

export const caseStudySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  context: z.string().min(1),
  challenge: z.string().min(1),
  shift: z.string().min(1),
  outcome: z.string().min(1).optional(),
  anonymous: z.boolean().default(true),
  placeholder: z.boolean().default(false),
  order: z.number().int().nonnegative(),
});
export type CaseStudy = z.infer<typeof caseStudySchema>;

export const postFrontmatterSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string().min(1)),
  publishedAt: z.string().min(1),
  updatedAt: z.string().min(1).optional(),
  authorId: z.string().min(1),
  coverImage: z.string().optional(),
  coverAlt: z.string().optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  seo: seoSchema.optional(),
});
export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;

export const contactPayloadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  interest: z.string().optional(),
  message: z.string().min(10),
  consent: z.literal(true),
  source: z.string().optional(),
});
export type ContactPayload = z.infer<typeof contactPayloadSchema>;

export const contactFormSchema = contactPayloadSchema.extend({
  consent: z.boolean().refine((value) => value === true, {
    message: "Please confirm you agree to be contacted.",
  }),
});
export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const applicationPayloadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  role: z.string().min(2),
  company: z.string().min(2),
  location: z.string().min(2),
  linkedin: z.string().url().optional().or(z.literal("")),
  challenge: z.string().min(20),
  outcome: z.string().min(20),
  whyNow: z.string().min(10),
  tried: z.string().optional(),
  timeCommitment: z.string().min(2),
  investmentReadiness: z.string().min(2),
  referralSource: z.string().optional(),
  consent: z.literal(true),
});
export type ApplicationPayload = z.infer<typeof applicationPayloadSchema>;

/** Client-facing variant with a boolean consent so the checkbox can start unchecked. */
export const applicationFormSchema = applicationPayloadSchema.extend({
  consent: z.boolean().refine((value) => value === true, {
    message: "Please confirm you agree to be contacted about your application.",
  }),
});
export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

export const newsletterPayloadSchema = z.object({
  email: z.string().email(),
  consent: z.literal(true),
  source: z.string().optional(),
});
export type NewsletterPayload = z.infer<typeof newsletterPayloadSchema>;

export const newsletterFormSchema = newsletterPayloadSchema.extend({
  consent: z.boolean().refine((value) => value === true, {
    message: "Please confirm you agree to receive the newsletter.",
  }),
});
export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;

export const guidePayloadSchema = z.object({
  firstName: z.string().min(2),
  email: z.string().email(),
  consent: z.literal(true),
  source: z.string().optional(),
});
export type GuidePayload = z.infer<typeof guidePayloadSchema>;

export const guideFormSchema = guidePayloadSchema.extend({
  consent: z.boolean().refine((value) => value === true, {
    message: "Please confirm you agree to receive the guide and occasional emails.",
  }),
});
export type GuideFormValues = z.infer<typeof guideFormSchema>;
