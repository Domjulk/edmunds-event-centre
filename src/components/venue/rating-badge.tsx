import { Star } from "lucide-react";

export function RatingBadge({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 ${compact ? "" : "border border-ivory/20 bg-card/5 px-4 py-3"} ${className}`}
    >
      <Star size={18} fill="currentColor" className="text-rose-gold-soft" aria-hidden="true" />
      <div>
        <p className="text-sm font-semibold">3.9 / 5</p>
        <p className="text-[10px] text-current/70">88 total reviews</p>
      </div>
    </div>
  );
}
