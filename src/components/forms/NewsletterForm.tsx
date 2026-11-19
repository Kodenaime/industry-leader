"use client";

import Link from "next/link";
import * as React from "react";
import { FormError } from "./FormError";
import { Input } from "./Input";
import { SubmitButton } from "./SubmitButton";
import { fieldAriaProps } from "./Field";
import { submitForm } from "@/lib/forms/submit-form";
import { elapsedMsSince, timestamp } from "@/lib/forms/timing";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Status =
  | { type: "idle" }
  | { type: "error"; message: string }
  | { type: "success"; message: string; simulated: boolean };

type FieldErrors = { email?: string; consent?: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Footer/CTA newsletter form. Kept intentionally dependency-free (no form
 * library) because it ships on every page; heavier validated forms load only
 * on their own routes.
 */
export function NewsletterForm({
  variant = "light",
  source = "footer",
  className,
}: {
  variant?: "light" | "dark";
  source?: string;
  className?: string;
}) {
  const dark = variant === "dark";
  const [status, setStatus] = React.useState<Status>({ type: "idle" });
  const [started, setStarted] = React.useState(false);
  const [mountedAt] = React.useState(() => timestamp());
  const [email, setEmail] = React.useState("");
  const [consent, setConsent] = React.useState(false);
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (started) trackEvent("form_start", { form: "newsletter" });
  }, [started]);

  const emailId = `newsletter-email-${source}`;
  const consentId = `newsletter-consent-${source}`;

  const validate = () => {
    const next: FieldErrors = {};
    if (!EMAIL_PATTERN.test(email.trim())) next.email = "Enter a valid email address.";
    if (!consent) next.consent = "Please confirm you agree to receive the newsletter.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ type: "idle" });
    if (!validate()) return;
    if (elapsedMsSince(mountedAt) < 2000) {
      setStatus({ type: "error", message: "Please take a moment and try again." });
      return;
    }

    setIsSubmitting(true);
    trackEvent("form_submit", { form: "newsletter" });
    const result = await submitForm({
      form: "newsletter",
      payload: {
        email: email.trim(),
        consent: "yes",
        source,
        _subject: "Newsletter signup — The Industry Leader",
        submittedAt: new Date().toISOString(),
      },
    });
    setIsSubmitting(false);

    if (!result.ok) {
      trackEvent("form_error", {
        form: "newsletter",
        status: result.status,
        submissionId: result.submissionId,
      });
      setStatus({ type: "error", message: result.message });
      return;
    }

    trackEvent("newsletter_signup", { source, submissionId: result.submissionId });
    setEmail("");
    setConsent(false);
    setErrors({});
    setStatus({
      type: "success",
      message: "You're on the list. Watch for the next letter.",
      simulated: result.status === "simulated",
    });
  };

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      onChangeCapture={() => setStarted(true)}
      className={cn("space-y-3", className)}
    >
      <div className="sr-only" aria-live="polite">
        {status.type === "success" ? status.message : ""}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <label htmlFor={emailId} className="sr-only">
            Email address
          </label>
          <Input
            id={emailId}
            type="email"
            autoComplete="email"
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            hasError={Boolean(errors.email)}
            className={cn(
              dark &&
                "border-cloud/20 bg-cloud/5 text-cloud placeholder:text-cloud/40 focus-visible:ring-gold",
            )}
            {...fieldAriaProps(emailId, { error: Boolean(errors.email) })}
          />
        </div>
        <SubmitButton loading={isSubmitting} size="md" className="sm:w-auto" variant="primary">
          Subscribe
        </SubmitButton>
      </div>

      <div className="flex items-start gap-2">
        <input
          id={consentId}
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className={cn(
            "mt-0.5 h-4 w-4 rounded-sm border accent-gold-deep",
            dark ? "border-cloud/30 bg-cloud/10" : "border-line bg-cloud",
          )}
          aria-invalid={Boolean(errors.consent) || undefined}
        />
        <label
          htmlFor={consentId}
          className={cn("text-xs leading-relaxed", dark ? "text-cloud/70" : "text-stone")}
        >
          I agree to receive The Industry Leader Letter and accept the{" "}
          <Link
            href="/privacy/"
            className={cn(
              "underline underline-offset-4",
              dark ? "decoration-cloud/30 hover:text-cloud" : "decoration-line hover:text-graphite",
            )}
          >
            privacy policy
          </Link>
          .
        </label>
      </div>

      {errors.email ? (
        <FormError className={cn(dark && "text-gold-soft")}>{errors.email}</FormError>
      ) : null}
      {errors.consent ? (
        <FormError className={cn(dark && "text-gold-soft")}>{errors.consent}</FormError>
      ) : null}
      {status.type === "error" ? (
        <FormError className={cn(dark && "text-gold-soft")}>{status.message}</FormError>
      ) : null}
      {status.type === "success" ? (
        <p className={cn("text-xs", dark ? "text-cloud/75" : "text-success")} role="status">
          {status.message}
          {status.simulated ? " (Development mode: no endpoint configured.)" : ""}
        </p>
      ) : null}
    </form>
  );
}
