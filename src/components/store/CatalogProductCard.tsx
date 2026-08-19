import { useEffect, useState } from "react";
import { Check } from "lucide-react";

import { PageLink as Link } from "./PageLink";
import { Rating } from "./Rating";
import { WishlistButton } from "./WishlistButton";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/data/products";
import type { CatalogProduct } from "@/data/catalog";

export function CatalogProductCard({ product }: { product: CatalogProduct }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 2000);
    return () => clearTimeout(t);
  }, [added]);

  return (
    <article className="group flex flex-col">
      <div className="relative overflow-hidden bg-sand">
        <Link to={`/shop/${product.id}`} aria-label={`View ${product.name}`} className="block">
          <img
            src={product.image}
            alt={product.name}
            width={1000}
            height={1000}
            loading="lazy"
            className="aspect-square w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <img
            src={product.hoverImage}
            alt=""
            aria-hidden="true"
            width={1000}
            height={1000}
            loading="lazy"
            className="absolute inset-0 size-full scale-105 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </Link>

        <div className="absolute left-3.5 top-3.5 flex flex-col items-start gap-1.5">
          {product.badge ? (
            <span className="bg-background/95 px-2.5 py-1 text-[0.62rem] tracking-[0.16em] uppercase text-ink">
              {product.badge}
            </span>
          ) : null}
          {!product.inStock ? (
            <span className="bg-ink/90 px-2.5 py-1 text-[0.62rem] tracking-[0.16em] uppercase text-primary-foreground">
              Made to order
            </span>
          ) : null}
        </div>

        <WishlistButton label={product.name} className="absolute right-3.5 top-3.5" />

        <div className="absolute inset-x-3 bottom-3 grid gap-1.5 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100 max-sm:translate-y-0 max-sm:opacity-100">
          <Button
            variant="quiet"
            size="pillSm"
            className="w-full"
            onClick={() => setAdded(true)}
            aria-live="polite"
          >
            {added ? (
              <>
                <Check aria-hidden="true" /> Added to bag
              </>
            ) : (
              "Add to cart"
            )}
          </Button>
          <Button variant="quiet" size="pillSm" className="w-full max-sm:hidden" asChild>
            <Link to={`/shop/${product.id}`}>View product</Link>
          </Button>
        </div>
      </div>

      <div className="mt-4 min-w-0">
        <p className="eyebrow">{product.categoryLabel}</p>
        <h3 className="mt-1.5 truncate font-display text-lg text-ink">
          <Link to={`/shop/${product.id}`} className="link-underline">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 truncate text-xs text-muted-foreground">{product.detail}</p>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <span className="text-sm text-foreground">{formatPrice(product.price)}</span>
          <Rating value={product.rating} count={product.reviews} />
        </div>
      </div>
    </article>
  );
}
