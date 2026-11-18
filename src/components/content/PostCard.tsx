/* eslint-disable @next/next/no-img-element -- unoptimized static export */
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { PostMeta } from "@/lib/content/loaders";
import { formatShortDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export function PostCard({
  post,
  className,
  featured = false,
}: {
  post: PostMeta;
  className?: string;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded border border-line bg-cloud shadow-soft transition-shadow hover:shadow-lift",
        className,
      )}
    >
      {post.coverImage ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-charcoal">
          <img
            src={post.coverImage}
            alt={post.coverAlt ?? ""}
            width={1200}
            height={675}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 ease-brand group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className={cn(
            "relative flex items-end bg-charcoal p-6",
            featured ? "aspect-[16/9]" : "aspect-[16/7]",
          )}
        >
          <span className="font-display text-4xl text-gold/90">IL</span>
          <span className="absolute inset-x-6 bottom-6 h-px bg-gold/40" />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-3 text-xs text-stone">
          <Badge variant="gold" className="capitalize">
            {post.category}
          </Badge>
          <time dateTime={post.publishedAt}>{formatShortDate(post.publishedAt)}</time>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {post.readingTime.text}
          </span>
        </div>
        <h3
          className={cn(
            "font-display text-ink",
            featured ? "text-2xl leading-tight sm:text-3xl" : "text-xl leading-snug",
          )}
        >
          <Link href={post.href} className="focus-visible:outline-none">
            <span className="absolute inset-0 z-10" aria-hidden="true" />
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-graphite">{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-gold-deep">
          Read the article
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </article>
  );
}
