"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "./Checkbox";
import { Field, fieldAriaProps } from "./Field";
import { FormError } from "./FormError";
import { Input } from "./Input";
import { SubmitButton } from "./SubmitButton";
import { guideFormSchema, type GuideFormValues } from "@/lib/content/schemas";
import { submitForm } from "@/lib/forms/submit-form";
import { elapsedMsSince, timestamp } from "@/lib/forms/timing";
import { trackEvent } from "@/lib/analytics";

type Status = { type: "idle" } | { type: "error"; message: string };

export function GuideForm({ source = "contact-free-guide" }: { source?: string }) {
  const router = useRouter();
  const [status, setStatus] = React.useState<Status>({ type: "idle" });
  const [honeypot, setHoneypot] = React.useState("");
  const [started, setStarted] = React.useState(false);
  const [mountedAt] = React.useState(() => timestamp());

  React.useEffect(() => {
    if (started) trackEvent("form_start", { form: "guide" });
  }, [started]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GuideFormValues>({
    resolver: zodResolver(guideFormSchema),
    mode: "onTouched",
    defaultValues: { firstName: "", email: "", consent: false },
  });

  const markStarted = () => {
    setStarted(true);
  };

  const onSubmit = async (values: GuideFormValues) => {
    setStatus({ type: "idle" });
    if (
      honeypot.trim() !== "" ||
      (elapsedMsSince(mountedAt) < 2500)
    ) {
      setStatus({ type: "error", message: "Please take a moment and try again." });
      return;
    }
    trackEvent("form_submit", { form: "guide" });
    const result = await submitForm({
      form: "guide",
      payload: {
        ...values,
        consent: "yes",
        source,
        _subject: "Free guide request — The Industry Leader",
        _gotcha: honeypot,
        submittedAt: new Date().toISOString(),
      },
    });
    if (!result.ok) {
      trackEvent("form_error", {
        form: "guide",
        status: result.status,
        submissionId: result.submissionId,
      });
      setStatus({ type: "error", message: result.message });
      return;
    }
    trackEvent("form_success", { form: "guide", submissionId: result.submissionId });
    router.push("/free-guide/thank-you/");
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} onChangeCapture={markStarted} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" htmlFor="guide-first-name" required error={errors.firstName?.message}>
          <Input
            id="guide-first-name"
            autoComplete="given-name"
            hasError={Boolean(errors.firstName)}
            {...fieldAriaProps("guide-first-name", { error: Boolean(errors.firstName) })}
            {...register("firstName")}
          />
        </Field>
        <Field label="Email" htmlFor="guide-email" required error={errors.email?.message}>
          <Input
            id="guide-email"
            type="email"
            autoComplete="email"
            hasError={Boolean(errors.email)}
            {...fieldAriaProps("guide-email", { error: Boolean(errors.email) })}
            {...register("email")}
          />
        </Field>
      </div>

      <Checkbox
        id="guide-consent"
        label="Send me the guide and occasional leadership notes."
        description={
          <>
            No spam. Unsubscribe at any time. Read the{" "}
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
        <label htmlFor="guide-website">Leave this field empty</label>
        <input
          id="guide-website"
          name="guideWebsite"
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

      <SubmitButton loading={isSubmitting} size="lg" className="w-full sm:w-auto">
        Send me the guide
      </SubmitButton>
      <p className="text-xs text-graphite">Sent to your inbox. No payment details required.</p>
    </form>
  );
}
