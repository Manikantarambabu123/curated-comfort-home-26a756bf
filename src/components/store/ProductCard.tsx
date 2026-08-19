import { useEffect, useState } from "react";
import { PageLink as Link } from "./PageLink";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Rating } from "./Rating";
import { WishlistButton } from "./WishlistButton";
import { formatPrice, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 2000);
    return () => clearTimeout(t);
  }, [added]);

  return (
    <article className="group flex flex-col">
      <div className="relative overflow-hidden bg-sand">
        <Link to="/shop" aria-label={product.name} className="block">
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

        {product.badge ? (
          <span className="absolute left-4 top-4 bg-background/95 px-2.5 py-1 text-[0.62rem] tracking-[0.16em] uppercase text-ink">
            {product.badge}
          </span>
        ) : null}

        <WishlistButton label={product.name} className="absolute right-3.5 top-3.5" />

        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100 max-sm:translate-y-0 max-sm:opacity-100">
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
              "Quick add"
            )}
          </Button>
        </div>
      </div>

      <div className="mt-4 min-w-0">
        <p className="eyebrow">{product.type}</p>
        <h3 className="mt-1.5 truncate font-display text-lg text-ink">
          <Link to="/shop" className="link-underline">
            {product.name}
          </Link>
        </h3>
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="text-sm text-foreground">{formatPrice(product.price)}</span>
          <Rating value={product.rating} count={product.reviews} />
        </div>
      </div>
    </article>
  );
}
