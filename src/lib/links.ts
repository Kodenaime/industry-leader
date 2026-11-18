import { SITE } from "@/lib/constants";

export const APPLY_HREF = "/#apply";
export const PROGRAM_HREF = "/program/";
export const PROJECTS_HREF = "/projects/";
export const TESTIMONIALS_HREF = "/testimonials/";
export const CONTACT_HREF = "/contact/";
export const FREE_GUIDE_HREF = "/#free-guide";
export const ABOUT_HREF = "/#about";
export const INSIGHTS_HREF = "/#insights";

/** Falls back to the contact page until a scheduling link is configured. */
export const BOOKING_HREF = SITE.bookingUrl || CONTACT_HREF;
export const BOOKING_IS_EXTERNAL = /^https?:\/\//.test(BOOKING_HREF);
