import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Heart,
  Minus,
  Plus,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";

import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { PageLink } from "@/components/store/PageLink";
import { Reveal } from "@/components/store/Reveal";
import { Rating } from "@/components/store/Rating";
import { SectionHeading } from "@/components/store/SectionHeading";
import { ProductGallery } from "@/components/store/ProductGallery";
import { CatalogProductCard } from "@/components/store/CatalogProductCard";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { catalogProducts } from "@/data/catalog";
import {
  findProduct,
  formatGBP,
  getProductDetail,
  ratingBreakdown,
  reviewsList,
} from "@/data/productDetail";

export const Route = createFileRoute("/shop/$productId")({
  head: ({ params }) => {
    const product = findProduct(params.productId);
    const detail = getProductDetail(product.id);
    const title = `${product.name} — Lumora`;
    const description = detail.description;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductDetails,
});

function OptionRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="eyebrow">{label}</p>
        <span className="text-sm text-ink">{value}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={label}>
        {options.map((o) => {
          const active = o === value;
          return (
            <button
              key={o}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o)}
              className={cn(
                "border px-4 py-2 text-xs tracking-[0.1em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                active
                  ? "border-ink bg-ink text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-ink hover:text-ink",
              )}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProductDetails() {
  const { productId } = Route.useParams();
  const product = findProduct(productId);
  const detail = getProductDetail(product.id);

  const price = detail.price ?? product.price;
  const rating = detail.rating ?? product.rating;
  const reviews = detail.reviews ?? product.reviews;

  const [color, setColor] = useState(detail.colors[0]!);
  const [material, setMaterial] = useState(detail.materials[0]!);
  const [size, setSize] = useState(detail.sizes[1] ?? detail.sizes[0]!);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [postcode, setPostcode] = useState("");
  const [delivery, setDelivery] = useState<string | null>(null);

  const related = useMemo(
    () => catalogProducts.filter((p) => p.id !== product.id).slice(0, 4),
    [product.id],
  );
  const curated = useMemo(
    () => catalogProducts.filter((p) => p.id !== product.id).slice(4, 8),
    [product.id],
  );

  const totalReviews = ratingBreakdown.reduce((a, r) => a + r.count, 0);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pb-24 lg:pb-0">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-sand/40">
          <nav
            aria-label="Breadcrumb"
            className="mx-auto max-w-[1400px] overflow-x-auto px-5 py-4 text-[0.7rem] tracking-[0.14em] whitespace-nowrap uppercase text-muted-foreground lg:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <PageLink to="/" className="hover:text-ink">
              Home
            </PageLink>
            <span className="px-2">/</span>
            <PageLink to="/shop" className="hover:text-ink">
              Furniture
            </PageLink>
            <span className="px-2">/</span>
            <PageLink to="/shop" className="hover:text-ink">
              Sofas
            </PageLink>
            <span className="px-2">/</span>
            <span className="text-ink">{product.name}</span>
          </nav>
        </div>

        {/* Product */}
        <section className="mx-auto grid max-w-[1400px] gap-10 px-5 py-10 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-14">
          <ProductGallery images={detail.gallery} alt={product.name} />

          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">{detail.categoryLabel}</p>
            <h1 className="mt-3 font-display text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[2.75rem]">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Rating value={rating} />
              <span className="text-sm text-muted-foreground">
                {rating.toFixed(1)} ({reviews} reviews)
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <p className="text-2xl text-ink">{formatGBP(price)}</p>
              <span className="inline-flex items-center gap-2 border border-border bg-card px-3 py-1.5 text-[0.68rem] tracking-[0.12em] uppercase text-muted-foreground">
                <Truck aria-hidden="true" className="size-3.5" /> Free delivery
              </span>
            </div>

            <p className="mt-6 max-w-prose text-[0.95rem] leading-relaxed text-muted-foreground">
              {detail.description}
            </p>

            <div className="mt-8 grid gap-6 border-t border-border pt-8">
              <OptionRow label="Colour" options={detail.colors} value={color} onChange={setColor} />
              <OptionRow
                label="Material"
                options={detail.materials}
                value={material}
                onChange={setMaterial}
              />
              <OptionRow label="Size" options={detail.sizes} value={size} onChange={setSize} />
            </div>

            {/* Quantity + CTA */}
            <div className="mt-8 grid gap-4 border-t border-border pt-8">
              <div className="flex items-center gap-4">
                <p className="eyebrow">Quantity</p>
                <div className="flex items-center border border-border bg-card">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="grid size-11 place-items-center text-ink transition-colors hover:bg-sand focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
                  >
                    <Minus aria-hidden="true" className="size-4" />
                  </button>
                  <span aria-live="polite" className="w-10 text-center text-sm text-ink">
                    {qty}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQty((q) => Math.min(10, q + 1))}
                    className="grid size-11 place-items-center text-ink transition-colors hover:bg-sand focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
                  >
                    <Plus aria-hidden="true" className="size-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-stretch gap-3">
                <Button
                  variant="solid"
                  size="pill"
                  className="min-w-[14rem] flex-1"
                  onClick={() => setAdded(true)}
                  aria-live="polite"
                >
                  {added ? (
                    <>
                      <Check aria-hidden="true" /> Added to cart
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </Button>
                <Button variant="outlineWarm" size="pill" asChild>
                  <PageLink to="/checkout">Buy Now</PageLink>
                </Button>
                <button
                  type="button"
                  aria-pressed={saved}
                  aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
                  onClick={() => setSaved((s) => !s)}
                  className="grid size-12 place-items-center border border-border bg-card text-ink transition-colors hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <Heart
                    aria-hidden="true"
                    className={cn("size-4 transition-all", saved && "fill-clay stroke-clay scale-110")}
                  />
                </button>
              </div>
            </div>

            {/* Delivery check */}
            <div className="mt-8 border border-border bg-card p-6">
              <h2 className="font-display text-lg text-ink">Delivery</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Enter your postcode to check delivery availability.
              </p>
              <form
                className="mt-4 flex flex-wrap gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  const pc = postcode.trim().toUpperCase();
                  setDelivery(
                    pc
                      ? `Delivered to ${pc} in 3–5 weeks — free white-glove delivery, room of choice.`
                      : "Please enter a valid postcode to see estimated delivery.",
                  );
                }}
              >
                <label htmlFor="postcode" className="sr-only">
                  Postcode
                </label>
                <input
                  id="postcode"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="e.g. SW1A 1AA"
                  className="h-11 min-w-0 flex-1 border border-border bg-background px-4 text-sm text-ink placeholder:text-muted-foreground focus-visible:border-ink focus-visible:outline-none"
                />
                <Button type="submit" variant="quiet" size="pillSm">
                  Check
                </Button>
              </form>
              {delivery ? (
                <p aria-live="polite" className="mt-4 text-sm text-ink">
                  {delivery}
                </p>
              ) : null}
            </div>

            {/* Accordion */}
            <Accordion type="single" collapsible defaultValue="description" className="mt-8">
              <AccordionItem value="description">
                <AccordionTrigger className="text-sm text-ink">Description</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {detail.description} Hand-built in our workshop with a kiln-dried hardwood frame,
                  feather-wrapped cushions and a tailored, removable cover.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="dimensions">
                <AccordionTrigger className="text-sm text-ink">Dimensions</AccordionTrigger>
                <AccordionContent>
                  <dl className="grid gap-2 text-sm">
                    {detail.dimensions.map((d) => (
                      <div key={d.label} className="flex justify-between gap-4 border-b border-border pb-2">
                        <dt className="text-muted-foreground">{d.label}</dt>
                        <dd className="text-ink">{d.value}</dd>
                      </div>
                    ))}
                  </dl>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="materials">
                <AccordionTrigger className="text-sm text-ink">Materials &amp; Care</AccordionTrigger>
                <AccordionContent>
                  <ul className="grid gap-2 text-sm leading-relaxed text-muted-foreground">
                    {detail.care.map((c) => (
                      <li key={c} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2 size-1 shrink-0 bg-clay" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="delivery">
                <AccordionTrigger className="text-sm text-ink">Delivery &amp; Returns</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  Free white-glove delivery to your room of choice, typically 3–5 weeks. Returns
                  accepted within 30 days of delivery on non-customised pieces.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="warranty">
                <AccordionTrigger className="text-sm text-ink">Warranty</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {detail.warranty}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Customization */}
        <section className="border-y border-border bg-sand/40">
          <div className="mx-auto max-w-[1400px] px-5 py-12 lg:px-10 lg:py-16">
            <Reveal className="flex flex-col gap-6 border border-border bg-card px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">
              <div className="flex items-start gap-4">
                <Sparkles aria-hidden="true" className="mt-1 size-5 shrink-0 text-clay" />
                <div>
                  <h2 className="font-display text-2xl text-ink">Want it made differently?</h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    Customize fabric, finish, dimensions, and other details.
                  </p>
                </div>
              </div>
              <Button variant="solid" size="pill" asChild className="shrink-0">
                <PageLink to="/customize">
                  Customize This Product <ArrowRight aria-hidden="true" className="size-4" />
                </PageLink>
              </Button>
            </Reveal>
          </div>
        </section>

        {/* Reviews */}
        <section className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10 lg:py-20">
          <SectionHeading
            eyebrow="Reviews"
            title="What customers say"
            action={
              <Button variant="outlineWarm" size="pillSm">
                Write a Review
              </Button>
            }
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="font-display text-5xl text-ink">{rating.toFixed(1)}</p>
              <div className="mt-3">
                <Rating value={rating} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Based on {reviews} reviews</p>

              <ul className="mt-6 grid gap-2.5">
                {ratingBreakdown.map((r) => (
                  <li key={r.stars} className="flex items-center gap-3">
                    <span className="flex w-10 items-center gap-1 text-xs text-muted-foreground">
                      {r.stars}
                      <Star aria-hidden="true" className="size-3 fill-clay stroke-clay" />
                    </span>
                    <span className="h-1.5 flex-1 bg-sand">
                      <span
                        className="block h-full bg-clay"
                        style={{ width: `${(r.count / totalReviews) * 100}%` }}
                      />
                    </span>
                    <span className="w-8 text-right text-xs text-muted-foreground">{r.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="grid gap-8">
              {reviewsList.map((r) => (
                <li key={r.name} className="border-b border-border pb-8 last:border-0 last:pb-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <Rating value={r.rating} />
                    {r.verified ? (
                      <span className="inline-flex items-center gap-1.5 bg-sand px-2.5 py-1 text-[0.62rem] tracking-[0.14em] uppercase text-ink">
                        <Check aria-hidden="true" className="size-3" /> Verified purchase
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-3 font-display text-lg text-ink">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                  <p className="mt-3 text-xs tracking-[0.12em] uppercase text-muted-foreground">
                    {r.name} · {r.date}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Related */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10 lg:py-20">
            <SectionHeading eyebrow="Similar pieces" title="You May Also Like" />
            <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
              {related.map((p) => (
                <Reveal key={p.id}>
                  <CatalogProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Curated */}
        <section className="border-t border-border bg-sand/40">
          <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10 lg:py-20">
            <SectionHeading
              eyebrow="Complete the room"
              title="Curated for You"
              subtitle="Coffee tables, lighting, rugs and side tables chosen to sit alongside the Arlo."
            />
            <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
              {curated.map((p) => (
                <Reveal key={p.id}>
                  <CatalogProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Sticky mobile actions */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs text-muted-foreground">{product.name}</p>
            <p className="text-sm text-ink">{formatGBP(price)}</p>
          </div>
          <Button
            variant="solid"
            size="pillSm"
            className="flex-1"
            onClick={() => setAdded(true)}
          >
            {added ? (
              <>
                <Check aria-hidden="true" /> Added
              </>
            ) : (
              "Add to Cart"
            )}
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
