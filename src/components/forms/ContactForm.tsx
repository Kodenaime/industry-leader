"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "./Checkbox";
import { Field, fieldAriaProps } from "./Field";
import { FormError } from "./FormError";
import { Input } from "./Input";
import { Select } from "./Select";
import { SubmitButton } from "./SubmitButton";
import { Textarea } from "./Textarea";
import { contactFormSchema, type ContactFormValues } from "@/lib/content/schemas";
import { submitForm } from "@/lib/forms/submit-form";
import { elapsedMsSince, timestamp } from "@/lib/forms/timing";
import { trackEvent } from "@/lib/analytics";

type Status =
  | { type: "idle" }
  | { type: "error"; message: string }
  | { type: "success"; message: string; simulated: boolean };

export function ContactForm({ source = "contact-page" }: { source?: string }) {
  const [status, setStatus] = React.useState<Status>({ type: "idle" });
  const [honeypot, setHoneypot] = React.useState("");
  const [started, setStarted] = React.useState(false);
  const [mountedAt] = React.useState(() => timestamp());

  React.useEffect(() => {
    if (started) trackEvent("form_start", { form: "contact" });
  }, [started]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      interest: "",
      message: "",
      consent: false,
    },
  });

  const markStarted = () => {
    setStarted(true);
  };

  const onSubmit = async (values: ContactFormValues) => {
    setStatus({ type: "idle" });
    if (
      honeypot.trim() !== "" ||
      (elapsedMsSince(mountedAt) < 2500)
    ) {
      setStatus({ type: "error", message: "Please take a moment and try again." });
      return;
    }

    trackEvent("form_submit", { form: "contact" });
    const { consent: _consent, ...rest } = values;
    void _consent;
    const result = await submitForm({
      form: "contact",
      payload: {
        ...rest,
        consent: "yes",
        source,
        _subject: "Website contact — The Industry Leader",
        _gotcha: honeypot,
        submittedAt: new Date().toISOString(),
      },
    });

    if (!result.ok) {
      trackEvent("form_error", { form: "contact", status: result.status });
      setStatus({ type: "error", message: result.message });
      return;
    }

    trackEvent("form_success", { form: "contact" });
    reset();
    setStatus({
      type: "success",
      message: result.message,
      simulated: result.status === "simulated",
    });
  };

  if (status.type === "success") {
    return (
      <div className="rounded border border-success/25 bg-cloud p-6 shadow-soft sm:p-8" role="status">
        <CheckCircle2 className="h-7 w-7 text-success" aria-hidden="true" />
        <h2 className="mt-4 font-display text-xl text-ink">Message sent.</h2>
        <p className="mt-2 text-sm leading-relaxed text-graphite">
          Thank you for reaching out. Matthew or the team will reply as soon as possible, usually
          within two business days.
        </p>
        {status.simulated ? (
          <p className="mt-4 rounded border border-gold/40 bg-gold-soft/50 p-3 text-xs leading-relaxed text-graphite">
            {status.message}
          </p>
        ) : null}
        <button
          type="button"
          onClick={() => setStatus({ type: "idle" })}
          className="mt-5 text-sm font-semibold text-gold-deep underline decoration-gold-deep/30 underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} onChangeCapture={markStarted} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="contact-name" required error={errors.name?.message}>
          <Input
            id="contact-name"
            autoComplete="name"
            hasError={Boolean(errors.name)}
            {...fieldAriaProps("contact-name", { error: Boolean(errors.name) })}
            {...register("name")}
          />
        </Field>
        <Field label="Email" htmlFor="contact-email" required error={errors.email?.message}>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            hasError={Boolean(errors.email)}
            {...fieldAriaProps("contact-email", { error: Boolean(errors.email) })}
            {...register("email")}
          />
        </Field>
        <Field label="Phone" htmlFor="contact-phone" description="Optional" error={errors.phone?.message}>
          <Input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            hasError={Boolean(errors.phone)}
            {...fieldAriaProps("contact-phone", { error: Boolean(errors.phone), description: true })}
            {...register("phone")}
          />
        </Field>
        <Field label="What is this about?" htmlFor="contact-interest">
          <Select id="contact-interest" {...register("interest")}>
            <option value="">Select one (optional)</option>
            <option value="program">Program application</option>
            <option value="coaching">Coaching question</option>
            <option value="speaking">Speaking or media</option>
            <option value="advisory">Advisory or partnership</option>
            <option value="other">Something else</option>
          </Select>
        </Field>
      </div>

      <Field label="Message" htmlFor="contact-message" required error={errors.message?.message}>
        <Textarea
          id="contact-message"
          rows={6}
          hasError={Boolean(errors.message)}
          {...fieldAriaProps("contact-message", { error: Boolean(errors.message) })}
          {...register("message")}
        />
      </Field>

      <Checkbox
        id="contact-consent"
        label="I agree to be contacted about this message."
        description={
          <>
            Read the{" "}
            <Link href="/privacy/" className="underline decoration-line underline-offset-4">
              privacy policy
            </Link>
            .
          </>
        }
        hasError={Boolean(errors.consent)}
        {...register("consent")}
      />
      <FormError>{errors.consent?.message}</FormError>

      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          name="contactWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div aria-live="polite" aria-atomic="true">
        {status.type === "error" ? (
          <FormError className="rounded border border-error/20 bg-error/5 p-3">{status.message}</FormError>
        ) : null}
      </div>

      <SubmitButton loading={isSubmitting}>Send message</SubmitButton>
    </form>
  );
}
