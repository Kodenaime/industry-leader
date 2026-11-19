import { Badge } from "@/components/ui/Badge";
import type { CaseStudy } from "@/lib/content/schemas";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="flex h-full flex-col rounded border border-line bg-cloud p-6 shadow-soft sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-display text-sm text-gold-deep">Case study</span>
        {study.anonymous ? <Badge variant="muted">Anonymized</Badge> : null}
        {study.placeholder ? <Badge variant="muted">Placeholder</Badge> : null}
      </div>
      <h3 className="mt-3 font-display text-xl leading-snug text-ink">{study.title}</h3>
      <p className="mt-1 text-sm font-medium text-graphite">{study.context}</p>
      <dl className="mt-5 space-y-4 text-sm leading-relaxed">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-stone">Challenge</dt>
          <dd className="mt-1 text-graphite">{study.challenge}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-stone">The shift</dt>
          <dd className="mt-1 text-graphite">{study.shift}</dd>
        </div>
      </dl>
    </article>
  );
}
