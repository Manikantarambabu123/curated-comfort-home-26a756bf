import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  PackageCheck,
  RefreshCw,
  Ruler,
  ShieldCheck,
  Quote,
} from "lucide-react";

import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { SectionHeading } from "@/components/store/SectionHeading";
import { CategoryCard } from "@/components/store/CategoryCard";
import { ProductCard } from "@/components/store/ProductCard";
import { Reveal } from "@/components/store/Reveal";
import { PageLink } from "@/components/store/PageLink";
import { Button } from "@/components/ui/button";
import { categories, products } from "@/data/products";

import heroImage from "@/assets/hero-living-room.jpg";
import personalizeImage from "@/assets/personalize.jpg";
import editorialImage from "@/assets/editorial-collection.jpg";
import customImage from "@/assets/custom-craft.jpg";

const title = "Lumora — Modern Furniture & Home Décor for Considered Living";
const description =
  "Shop Lumora's warm-minimal sofas, beds, dining tables and home décor. Custom furniture, free delivery over $999 and personalized styling recommendations.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const values = [
  { Icon: PackageCheck, label: "Free Delivery", note: "On orders over $999" },
  { Icon: RefreshCw, label: "Easy Returns", note: "30-day home trial" },
  { Icon: Ruler, label: "Custom Furniture", note: "Made to your dimensions" },
  { Icon: ShieldCheck, label: "Secure Payments", note: "Encrypted checkout" },
];

const reviews = [
  {
    quote:
      "The Arlo sofa completely changed our living room. The linen feels substantial and the delivery team assembled everything in under an hour.",
    name: "Priya Raghavan",
    city: "Austin, TX",
  },
  {
    quote:
      "We ordered the Linea table in a custom length for our narrow dining room. The oak grain is beautiful and the fit is exact.",
    name: "Daniel Okoye",
    city: "Chicago, IL",
  },
  {
    quote:
      "The style quiz suggested pieces I would never have found on my own, and they work together perfectly. Genuinely helpful, not gimmicky.",
    name: "Marta Lindqvist",
    city: "Portland, OR",
  },
];

function Stars() {
  return (
    <div className="flex gap-1" aria-label="Rated 5 out of 5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} aria-hidden="true" className="text-clay">
          ★
        </span>
      ))}
    </div>
  );
}

function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative">
          <img
            src={heroImage}
            alt="Warm minimal living room with a linen sofa, travertine coffee table and olive branches"
            width={1920}
            height={1200}
            className="h-[78vh] min-h-[520px] w-full object-cover lg:h-[86vh]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-ink/25 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-[1400px] px-5 lg:px-10">
              <div className="max-w-xl text-primary-foreground">
                <p className="eyebrow text-primary-foreground/80">New Season · Warm Minimal</p>
                <h1 className="mt-4 font-display text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.25rem]">
                  Designed for the way you live.
                </h1>
                <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-primary-foreground/85">
                  Thoughtfully crafted furniture and home décor that brings comfort, character, and
                  timeless style into your space.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button asChild size="pill" className="bg-background text-ink rounded-none uppercase tracking-[0.14em] text-xs hover:bg-sand">
                    <PageLink to="/furniture">Shop Furniture</PageLink>
                  </Button>
                  <Button asChild variant="onImage" size="pill">
                    <PageLink to="/collections">Explore Collections</PageLink>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value strip */}
        <section aria-label="Store benefits" className="border-b border-border bg-secondary">
          <ul className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-6 px-5 py-8 lg:grid-cols-4 lg:px-10">
            {values.map(({ Icon, label, note }) => (
              <li key={label} className="flex min-w-0 items-center gap-3">
                <Icon className="size-5 shrink-0 stroke-[1.25] text-primary" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="truncate text-[0.8rem] tracking-[0.08em] uppercase text-ink">{label}</p>
                  <p className="truncate text-xs text-muted-foreground">{note}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Categories */}
        <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="Browse"
              title="Shop by Category"
              subtitle="Everything you need to create a space that feels like home."
              action={
                <Button asChild variant="outlineWarm" size="pillSm">
                  <PageLink to="/shop">View All</PageLink>
                </Button>
              }
            />
          </Reveal>

          <div className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-3">
            {categories.map((category, i) => (
              <Reveal
                key={category.id}
                delay={i * 60}
                className="w-[76vw] shrink-0 snap-start sm:w-auto"
              >
                <CategoryCard category={category} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Featured products */}
        <section className="border-y border-border bg-secondary/60">
          <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
            <Reveal>
              <SectionHeading
                eyebrow="Featured"
                title="Made to Live With"
                subtitle="Furniture designed for everyday comfort and lasting style."
                action={
                  <Button asChild variant="outlineWarm" size="pillSm">
                    <PageLink to="/shop">View All Products</PageLink>
                  </Button>
                }
              />
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, i) => (
                <Reveal key={product.id} delay={(i % 3) * 70}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Personalized recommendations */}
        <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <img
                src={personalizeImage}
                alt="Stylist comparing fabric swatches and wood finish samples"
                width={1200}
                height={1400}
                loading="lazy"
                className="aspect-[5/4] w-full object-cover lg:aspect-[4/5]"
              />
            </Reveal>
            <Reveal delay={80} className="min-w-0">
              <p className="eyebrow">Personalized</p>
              <h2 className="mt-3 text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[2.75rem]">
                Furniture That Fits Your Style
              </h2>
              <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
                Tell us what you love, and we'll curate pieces that work beautifully with your
                space.
              </p>
              <ol className="mt-8 space-y-4">
                {[
                  "Answer six quick questions about your rooms and taste.",
                  "We match materials, proportions and palettes to your home.",
                  "Get a curated edit you can shop, save or share.",
                ].map((step, i) => (
                  <li key={step} className="flex gap-4 text-sm text-foreground/85">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-border text-[0.7rem] text-muted-foreground">
                      {i + 1}
                    </span>
                    <span className="min-w-0">{step}</span>
                  </li>
                ))}
              </ol>
              <Button asChild variant="solid" size="pill" className="mt-9">
                <PageLink to="/style-quiz">
                  Find My Style <ArrowRight aria-hidden="true" />
                </PageLink>
              </Button>
            </Reveal>
          </div>
        </section>

        {/* Editorial banner */}
        <section className="relative">
          <img
            src={editorialImage}
            alt="Warm minimal interior with a bouclé armchair, oak console and linen curtains"
            width={1920}
            height={1008}
            loading="lazy"
            className="h-[520px] w-full object-cover lg:h-[640px]"
          />
          <div className="absolute inset-0 bg-ink/45" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-[1400px] px-5 lg:px-10">
              <Reveal className="max-w-lg text-primary-foreground">
                <p className="eyebrow text-primary-foreground/80">Collection</p>
                <h2 className="mt-4 font-display text-[2.4rem] leading-[1.08] sm:text-5xl">
                  The Warm Minimal Collection
                </h2>
                <p className="mt-5 text-[0.95rem] leading-relaxed text-primary-foreground/85">
                  Natural textures, soft forms, and timeless pieces designed to create calm,
                  inviting spaces.
                </p>
                <Button asChild variant="onImage" size="pill" className="mt-8">
                  <PageLink to="/collections/warm-minimal">Explore Collection</PageLink>
                </Button>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Customization */}
        <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <Reveal className="order-2 min-w-0 lg:order-1">
              <p className="eyebrow">Custom Orders</p>
              <h2 className="mt-3 text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[2.75rem]">
                Make It Yours
              </h2>
              <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
                Choose the fabric, finish, dimensions, and details to create a piece made
                specifically for your space.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4 lg:grid-cols-2">
                {[
                  ["40+", "Fabrics & leathers"],
                  ["12", "Wood finishes"],
                  ["6–8", "Weeks to make"],
                  ["10 yr", "Frame warranty"],
                ].map(([value, label]) => (
                  <div key={label} className="min-w-0">
                    <dt className="font-display text-2xl text-ink">{value}</dt>
                    <dd className="mt-1 text-xs text-muted-foreground">{label}</dd>
                  </div>
                ))}
              </dl>
              <Button asChild variant="solid" size="pill" className="mt-9">
                <PageLink to="/customize">Customize Your Furniture</PageLink>
              </Button>
            </Reveal>
            <Reveal delay={80} className="order-1 lg:order-2">
              <img
                src={customImage}
                alt="Upholsterer finishing a custom sofa in a workshop"
                width={1200}
                height={1400}
                loading="lazy"
                className="aspect-[5/4] w-full object-cover lg:aspect-[4/5]"
              />
            </Reveal>
          </div>
        </section>

        {/* Reviews */}
        <section className="border-y border-border bg-secondary/60">
          <div className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
            <Reveal>
              <SectionHeading
                eyebrow="Reviews"
                title="Loved by Homeowners"
                subtitle="Over 12,000 rooms furnished across the country."
                align="center"
              />
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {reviews.map((review, i) => (
                <Reveal key={review.name} delay={i * 70}>
                  <figure className="flex h-full flex-col border border-border bg-card p-8">
                    <Quote className="size-5 text-clay" aria-hidden="true" />
                    <blockquote className="mt-5 flex-1 font-display text-lg leading-relaxed text-ink">
                      {review.quote}
                    </blockquote>
                    <figcaption className="mt-6 border-t border-border pt-5">
                      <Stars />
                      <p className="mt-3 text-sm text-ink">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.city}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-10 lg:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Newsletter</p>
            <h2 className="mt-3 text-3xl text-ink sm:text-4xl">Bring Better Design Home</h2>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
              Get new collections, styling inspiration, and exclusive offers delivered to your
              inbox.
            </p>
            <form
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-12 min-w-0 flex-1 border border-input bg-card px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ink"
              />
              <Button type="submit" variant="solid" size="pill">
                {subscribed ? "Subscribed" : "Subscribe"}
              </Button>
            </form>
            <p aria-live="polite" className="mt-3 text-xs text-muted-foreground">
              {subscribed
                ? "Thank you — please check your inbox to confirm."
                : "No more than two emails a month. Unsubscribe anytime."}
            </p>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
