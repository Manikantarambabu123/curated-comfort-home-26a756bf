import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "gap-6",
        align === "center"
          ? "flex flex-col items-center text-center"
          : "grid grid-cols-1 items-end gap-4 sm:grid-cols-[minmax(0,1fr)_auto]",
        className,
      )}
    >
      <div className={cn("min-w-0", align === "center" && "max-w-2xl")}>
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <h2 className="text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[2.75rem]">{title}</h2>
        {subtitle ? (
          <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
