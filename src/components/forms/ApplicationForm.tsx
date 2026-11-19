"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "./Checkbox";
import { Field, fieldAriaProps } from "./Field";
import { FormError } from "./FormError";
import { Input } from "./Input";
import { Select } from "./Select";
import { SubmitButton } from "./SubmitButton";
import { Textarea } from "./Textarea";
import { applicationFormSchema, type ApplicationFormValues } from "@/lib/content/schemas";
import { submitForm } from "@/lib/forms/submit-form";
import { elapsedMsSince, timestamp } from "@/lib/forms/timing";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { BOOKING_HREF, BOOKING_IS_EXTERNAL } from "@/lib/links";

const steps = [
  { id: "you", label: "About you", fields: ["name", "email", "phone", "role", "company", "location", "linkedin"] },
  { id: "work", label: "The work", fields: ["challenge", "outcome", "whyNow", "tried"] },
  {
    id: "commitment",
    label: "Commitment",
    fields: ["timeCommitment", "investmentReadiness", "referralSource", "consent"],
  },
] as const satisfies ReadonlyArray<{
  id: string;
  label: string;
  fields: ReadonlyArray<keyof ApplicationFormValues>;
}>;

type Status = { type: "idle" } | { type: "error"; message: string } | { type: "success"; message: string };

export function ApplicationForm() {
  const [step, setStep] = React.useState(0);
  const [status, setStatus] = React.useState<Status>({ type: "idle" });
  const [honeypot, setHoneypot] = React.useState("");
  const [started, setStarted] = React.useState(false);
  const [mountedAt] = React.useState(() => timestamp());

  React.useEffect(() => {
    if (started) trackEvent("form_start", { form: "application" });
  }, [started]);

  const {
    register,
    handleSubmit,
    trigger,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
      company: "",
      location: "",
      linkedin: "",
      challenge: "",
      outcome: "",
      whyNow: "",
      tried: "",
      timeCommitment: "",
      investmentReadiness: "",
      referralSource: "",
      consent: false,
    },
  });

  const markStarted = () => {
    setStarted(true);
  };

  const goNext = async () => {
    setStatus({ type: "idle" });
    const valid = await trigger([...steps[step].fields], { shouldFocus: true });
    if (valid) setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const goBack = () => {
    setStatus({ type: "idle" });
    setStep((current) => Math.max(current - 1, 0));
  };

  const onInvalid = (formErrors: FieldErrors<ApplicationFormValues>) => {
    const first = Object.keys(formErrors)[0] as keyof ApplicationFormValues | undefined;
    if (first) setFocus(first);
    setStatus({
      type: "error",
      message: "Please check the highlighted fields and try again.",
    });
  };

  const onSubmit = async (values: ApplicationFormValues) => {
    setStatus({ type: "idle" });

    // Honeypot and timing checks: quietly decline obvious bot submissions.
    if (
      honeypot.trim() !== "" ||
      (elapsedMsSince(mountedAt) < 2500)
    ) {
      setStatus({
        type: "error",
        message: "Please take a moment to review your answers, then submit again.",
      });
      return;
    }

    trackEvent("form_submit", { form: "application" });

    const { consent: _consent, ...rest } = values;
    void _consent;
    const result = await submitForm({
      form: "application",
      payload: {
        ...rest,
        consent: "yes",
        source: "homepage-apply",
        _subject: "Program application — The Industry Leader",
        _gotcha: honeypot,
        submittedAt: new Date().toISOString(),
      },
    });

    if (!result.ok) {
      trackEvent("form_error", {
        form: "application",
        status: result.status,
        submissionId: result.submissionId,
      });
      setStatus({ type: "error", message: result.message });
      return;
    }

    trackEvent("form_success", { form: "application", submissionId: result.submissionId });
    setStatus({ type: "success", message: result.message });
  };

  if (status.type === "success") {
    return (
      <div className="rounded border border-success/25 bg-cloud p-6 shadow-soft sm:p-10" role="status">
        <CheckCircle2 className="h-8 w-8 text-success" aria-hidden="true" />
        <h2 className="mt-4 font-display text-2xl text-ink">Application received.</h2>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-graphite">
          Thank you for taking the time to apply. Matthew reviews every application personally.
          The next step is a short discovery call to talk through your situation and confirm fit.
        </p>
        {status.message.includes("Development mode") ? (
          <p className="mt-4 rounded border border-gold/40 bg-gold-soft/50 p-4 text-xs leading-relaxed text-graphite">
            {status.message}
          </p>
        ) : null}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button
            href={BOOKING_HREF}
            icon={<ArrowRight className="h-4 w-4" />}
            iconPosition="right"
            {...(BOOKING_IS_EXTERNAL ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            Book your discovery call
          </Button>
          <Button href="/program/" variant="secondary">
            Revisit the program
          </Button>
        </div>
        <p className="mt-6 text-xs text-stone">
          A copy of your answers is sent to the email address you provided. See our{" "}
          <Link href="/privacy/" className="underline decoration-line underline-offset-4">
            privacy policy
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      onChangeCapture={markStarted}
      className="space-y-8"
      aria-describedby="application-status"
    >
      <ol className="flex flex-wrap items-center gap-3 text-xs" aria-label="Application progress">
        {steps.map((item, index) => {
          const active = index === step;
          const complete = index < step;
          return (
            <li key={item.id} className="flex items-center gap-3">
              <span
                aria-current={active ? "step" : undefined}
                className={cn(
                  "inline-flex items-center gap-2 rounded-sm border px-2.5 py-1.5 font-medium tracking-wide",
                  active && "border-gold bg-gold-soft text-ink",
                  complete && "border-success/30 bg-success/10 text-success",
                  !active && !complete && "border-line bg-cloud text-stone",
                )}
              >
                <span aria-hidden="true">{complete ? "✓" : index + 1}</span>
                {item.label}
                <span className="sr-only">
                  {complete ? " (complete)" : active ? " (current step)" : " (upcoming)"}
                </span>
              </span>
              {index < steps.length - 1 ? (
                <span aria-hidden="true" className="h-px w-6 bg-line" />
              ) : null}
            </li>
          );
        })}
      </ol>

      <p className="sr-only" aria-live="polite">
        Step {step + 1} of {steps.length}: {steps[step].label}
      </p>

      {step === 0 ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" htmlFor="name" required error={errors.name?.message}>
            <Input
              id="name"
              autoComplete="name"
              hasError={Boolean(errors.name)}
              {...fieldAriaProps("name", { error: Boolean(errors.name) })}
              {...register("name")}
            />
          </Field>
          <Field label="Email" htmlFor="email" required error={errors.email?.message}>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              hasError={Boolean(errors.email)}
              {...fieldAriaProps("email", { error: Boolean(errors.email) })}
              {...register("email")}
            />
          </Field>
          <Field label="Phone" htmlFor="phone" required error={errors.phone?.message}>
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              hasError={Boolean(errors.phone)}
              {...fieldAriaProps("phone", { error: Boolean(errors.phone) })}
              {...register("phone")}
            />
          </Field>
          <Field label="Current role" htmlFor="role" required error={errors.role?.message}>
            <Input
              id="role"
              autoComplete="organization-title"
              hasError={Boolean(errors.role)}
              {...fieldAriaProps("role", { error: Boolean(errors.role) })}
              {...register("role")}
            />
          </Field>
          <Field label="Company or organization" htmlFor="company" required error={errors.company?.message}>
            <Input
              id="company"
              autoComplete="organization"
              hasError={Boolean(errors.company)}
              {...fieldAriaProps("company", { error: Boolean(errors.company) })}
              {...register("company")}
            />
          </Field>
          <Field label="Location" htmlFor="location" required error={errors.location?.message}>
            <Input
              id="location"
              autoComplete="address-level2"
              placeholder="City, country"
              hasError={Boolean(errors.location)}
              {...fieldAriaProps("location", { error: Boolean(errors.location) })}
              {...register("location")}
            />
          </Field>
          <Field
            label="LinkedIn profile"
            htmlFor="linkedin"
            description="Optional, but helpful."
            error={errors.linkedin?.message}
            className="sm:col-span-2"
          >
            <Input
              id="linkedin"
              type="url"
              placeholder="https://www.linkedin.com/in/…"
              hasError={Boolean(errors.linkedin)}
              {...fieldAriaProps("linkedin", { error: Boolean(errors.linkedin), description: true })}
              {...register("linkedin")}
            />
          </Field>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="space-y-5">
          <Field
            label="What is the leadership challenge in front of you right now?"
            htmlFor="challenge"
            description="A few honest sentences are more useful than a polished answer."
            required
            error={errors.challenge?.message}
          >
            <Textarea
              id="challenge"
              rows={4}
              hasError={Boolean(errors.challenge)}
              {...fieldAriaProps("challenge", { error: Boolean(errors.challenge), description: true })}
              {...register("challenge")}
            />
          </Field>
          <Field
            label="What outcome would make this program worth it?"
            htmlFor="outcome"
            required
            error={errors.outcome?.message}
          >
            <Textarea
              id="outcome"
              rows={4}
              hasError={Boolean(errors.outcome)}
              {...fieldAriaProps("outcome", { error: Boolean(errors.outcome) })}
              {...register("outcome")}
            />
          </Field>
          <Field label="Why now?" htmlFor="whyNow" required error={errors.whyNow?.message}>
            <Textarea
              id="whyNow"
              rows={3}
              hasError={Boolean(errors.whyNow)}
              {...fieldAriaProps("whyNow", { error: Boolean(errors.whyNow) })}
              {...register("whyNow")}
            />
          </Field>
          <Field
            label="What have you already tried?"
            htmlFor="tried"
            description="Optional. Courses, coaching, internal programs, or self-directed work."
            error={errors.tried?.message}
          >
            <Textarea
              id="tried"
              rows={3}
              hasError={Boolean(errors.tried)}
              {...fieldAriaProps("tried", { error: Boolean(errors.tried), description: true })}
              {...register("tried")}
            />
          </Field>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-5">
          <Field label="Can you commit to the eight weeks?" htmlFor="timeCommitment" required error={errors.timeCommitment?.message}>
            <Select
              id="timeCommitment"
              hasError={Boolean(errors.timeCommitment)}
              {...fieldAriaProps("timeCommitment", { error: Boolean(errors.timeCommitment) })}
              {...register("timeCommitment")}
            >
              <option value="">Select one</option>
              <option value="2-3 hours per week">Yes — 2–3 hours per week</option>
              <option value="session plus focused work">Yes — session plus focused application work</option>
              <option value="need to discuss">I need to discuss the commitment</option>
            </Select>
          </Field>
          <Field
            label="Are you ready to discuss investment?"
            htmlFor="investmentReadiness"
            description="The program is application-only. Investment is discussed on the discovery call."
            required
            error={errors.investmentReadiness?.message}
          >
            <Select
              id="investmentReadiness"
              hasError={Boolean(errors.investmentReadiness)}
              {...fieldAriaProps("investmentReadiness", {
                error: Boolean(errors.investmentReadiness),
                description: true,
              })}
              {...register("investmentReadiness")}
            >
              <option value="">Select one</option>
              <option value="ready if the fit is right">Yes, if the program is the right fit</option>
              <option value="want to discuss">I would like to discuss the investment</option>
              <option value="not sure yet">Not sure yet</option>
            </Select>
          </Field>
          <Field label="How did you hear about the program?" htmlFor="referralSource">
            <Select id="referralSource" {...register("referralSource")}>
              <option value="">Select one (optional)</option>
              <option value="search">Search</option>
              <option value="referral">Referral</option>
              <option value="linkedin">LinkedIn</option>
              <option value="speaking">TEDx or speaking</option>
              <option value="book">The book</option>
              <option value="other">Other</option>
            </Select>
          </Field>

          <div className="pt-2">
            <Checkbox
              id="consent"
              label="I agree to be contacted about this application."
              description={
                <>
                  Your answers are used only to review your application. Read the{" "}
                  <Link href="/privacy/" className="underline decoration-line underline-offset-4">
                    privacy policy
                  </Link>
                  .
                </>
              }
              hasError={Boolean(errors.consent)}
              {...register("consent")}
            />
            <FormError className="mt-1.5">{errors.consent?.message}</FormError>
          </div>
        </div>
      ) : null}

      {/* Honeypot: hidden from sighted and assistive-technology users. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="companyWebsite">Leave this field empty</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div id="application-status" aria-live="polite" aria-atomic="true">
        {status.type === "error" ? (
          <FormError className="rounded border border-error/20 bg-error/5 p-3">
            {status.message}
          </FormError>
        ) : null}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <Button
            type="button"
            variant="ghost"
            onClick={goBack}
            icon={<ArrowLeft className="h-4 w-4" />}
          >
            Back
          </Button>
        ) : (
          <p className="text-xs text-stone">Takes about 5 minutes. No payment details required.</p>
        )}

        {step < steps.length - 1 ? (
          <Button type="button" onClick={goNext} icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
            Continue
          </Button>
        ) : (
          <SubmitButton
            loading={isSubmitting}
            icon={<ArrowRight className="h-4 w-4" />}
            iconPosition="right"
          >
            Submit application
          </SubmitButton>
        )}
      </div>
    </form>
  );
}
