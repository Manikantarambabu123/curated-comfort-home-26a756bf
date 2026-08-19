import { PageLink as Link } from "./PageLink";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/data/products";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to="/shop"
      className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      aria-label={`Explore ${category.name}`}
    >
      <div className="relative overflow-hidden bg-sand">
        <img
          src={category.image}
          alt={category.name}
          width={900}
          height={1100}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
          <div className="min-w-0">
            <h3 className="truncate font-display text-xl text-primary-foreground">{category.name}</h3>
            <p className="mt-0.5 text-[0.7rem] tracking-[0.12em] uppercase text-primary-foreground/75">
              {category.count}
            </p>
          </div>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-background/90 text-ink transition-transform duration-300 group-hover:-translate-y-0.5">
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
