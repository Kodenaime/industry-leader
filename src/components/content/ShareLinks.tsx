"use client";

import { Check, Link2, Mail, Share2 } from "lucide-react";
import * as React from "react";
import { absoluteUrl } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

export function ShareLinks({
  path,
  title,
  className,
}: {
  path: string;
  title: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);
  const [copyError, setCopyError] = React.useState(false);
  const url = absoluteUrl(path);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    setCopyError(false);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(true);
    }
  };

  const nativeShare = async () => {
    if (typeof navigator.share !== "function") {
      await copyLink();
      return;
    }
    try {
      await navigator.share({ title, url });
    } catch {
      // The user dismissed the share sheet; nothing to report.
    }
  };

  const linkClass =
    "inline-flex h-10 items-center gap-2 rounded border border-line bg-cloud px-3 text-sm font-medium text-graphite transition-colors hover:border-ink/25 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2 focus-visible:ring-offset-mist";

  return (
    <div className={cn("space-y-3", className)}>
      <p className="text-sm font-semibold text-ink">Share this article</p>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={nativeShare} className={linkClass}>
          <Share2 className="h-4 w-4" aria-hidden="true" />
          Share
        </button>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          LinkedIn
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a
          href={`https://x.com/intent/post?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          X
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`} className={linkClass}>
          <Mail className="h-4 w-4" aria-hidden="true" />
          Email
        </a>
        <button type="button" onClick={copyLink} className={linkClass}>
          {copied ? (
            <Check className="h-4 w-4 text-success" aria-hidden="true" />
          ) : (
            <Link2 className="h-4 w-4" aria-hidden="true" />
          )}
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {copied ? "Link copied to clipboard." : ""}
      </p>
      {copyError ? (
        <p className="text-xs text-error">
          Could not copy automatically. Copy this address: {url}
        </p>
      ) : null}
    </div>
  );
}
