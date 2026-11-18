import { FORM_ENDPOINTS, type FormName } from "./endpoints";

export type SubmitStatus = "success" | "simulated" | "config" | "network" | "server";

export type SubmitResult = {
  ok: boolean;
  status: SubmitStatus;
  message: string;
};

export type SubmitFormOptions = {
  form: FormName;
  payload: Record<string, unknown>;
  /** Overrides the configured endpoint (used for staging tests). */
  endpoint?: string;
};

const GENERIC_ERROR =
  "Something went wrong while sending your message. Please try again, or email hello@theindustryleader.net.";

/**
 * Posts JSON to the configured form provider. Deliberately does not log the
 * payload: form submissions may contain personal information.
 */
export async function submitForm({
  form,
  payload,
  endpoint = FORM_ENDPOINTS[form],
}: SubmitFormOptions): Promise<SubmitResult> {
  if (!endpoint) {
    if (process.env.NODE_ENV !== "production") {
      return {
        ok: true,
        status: "simulated",
        message:
          "Development mode: no form endpoint is configured, so this submission was not sent. Add the Formspree endpoint to .env.local to test delivery.",
      };
    }
    return {
      ok: false,
      status: "config",
      message:
        "This form is not accepting submissions yet. Please email hello@theindustryleader.net and we will reply directly.",
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { ok: false, status: "server", message: GENERIC_ERROR };
    }

    return {
      ok: true,
      status: "success",
      message: "Thank you. Your message is on its way.",
    };
  } catch {
    return { ok: false, status: "network", message: GENERIC_ERROR };
  }
}
