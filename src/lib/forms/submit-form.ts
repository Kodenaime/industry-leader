import { FORM_ENDPOINTS, type FormName } from "./endpoints";

export type SubmitStatus = "success" | "simulated" | "config" | "network" | "server";

export type SubmitResult = {
  ok: boolean;
  status: SubmitStatus;
  message: string;
  /** Stable reference for the submission, included in the payload and analytics events. */
  submissionId: string;
};

export type SubmitFormOptions = {
  form: FormName;
  payload: Record<string, unknown>;
  /** Overrides the configured endpoint (used for staging tests). */
  endpoint?: string;
};

const GENERIC_ERROR =
  "Something went wrong while sending your message. Please try again, or email hello@theindustryleader.net.";

function createSubmissionId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `sub_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Posts JSON to the configured Formspree endpoint. Deliberately does not log the
 * payload: form submissions may contain personal information. A short reference
 * is returned so success/error analytics can be tied to a specific submission.
 */
export async function submitForm({
  form,
  payload,
  endpoint = FORM_ENDPOINTS[form],
}: SubmitFormOptions): Promise<SubmitResult> {
  const submissionId = createSubmissionId();

  if (!endpoint) {
    if (process.env.NODE_ENV !== "production") {
      return {
        ok: true,
        status: "simulated",
        message:
          "Development mode: no form endpoint is configured, so this submission was not sent. Add NEXT_PUBLIC_FORMSPREE_ENDPOINT to .env.local to test delivery.",
        submissionId,
      };
    }
    return {
      ok: false,
      status: "config",
      message:
        "This form is not accepting submissions yet. Please email hello@theindustryleader.net and we will reply directly.",
      submissionId,
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...payload,
        form,
        submissionId,
      }),
    });

    if (!response.ok) {
      return { ok: false, status: "server", message: GENERIC_ERROR, submissionId };
    }

    return {
      ok: true,
      status: "success",
      message: `Thank you. Your message is on its way. (Ref: ${submissionId.slice(0, 8)})`,
      submissionId,
    };
  } catch {
    return { ok: false, status: "network", message: GENERIC_ERROR, submissionId };
  }
}
