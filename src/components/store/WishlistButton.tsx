import { Heart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function WishlistButton({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${label} from wishlist` : `Save ${label} to wishlist`}
      onClick={() => setSaved((s) => !s)}
      className={cn(
        "grid size-9 place-items-center rounded-full bg-card/90 text-foreground shadow-[0_1px_6px_rgba(60,45,30,0.12)] backdrop-blur transition-colors hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
    >
      <Heart
        aria-hidden="true"
        className={cn(
          "size-4 transition-all",
          saved ? "fill-clay stroke-clay scale-110" : "stroke-current",
        )}
      />
    </button>
  );
}
