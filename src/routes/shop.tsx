import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Search, SlidersHorizontal, Sparkles } from "lucide-react";

import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { PageLink } from "@/components/store/PageLink";
import { Reveal } from "@/components/store/Reveal";
import { CatalogProductCard } from "@/components/store/CatalogProductCard";
import { CatalogFilters, defaultFilters, type Filters } from "@/components/store/CatalogFilters";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { catalogCategories, catalogProducts } from "@/data/catalog";

const title = "Shop Furniture & Home Décor — Lumora";
const description =
  "Browse the full Lumora catalog: sofas, chairs, tables, beds, dining, storage, lighting and décor. Filter by price, colour, material and size.";

export const Route = createFileRoute("/shop")({
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
  component: Shop,
});

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const PER_PAGE = 12;

function Shop() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recommended");
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const update = (next: Filters) => {
    setFilters(next);
    setPage(1);
  };

  const clearAll = () => {
    setFilters(defaultFilters);
    setQuery("");
    setPage(1);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = catalogProducts.filter((p) => {
      if (filters.category !== "all" && p.category !== filters.category) return false;
      if (p.price < filters.price[0] || p.price > filters.price[1]) return false;
      if (filters.colors.length && !filters.colors.includes(p.color)) return false;
      if (filters.materials.length && !filters.materials.includes(p.material)) return false;
      if (filters.sizes.length && !filters.sizes.includes(p.size)) return false;
      if (filters.inStockOnly && !p.inStock) return false;
      if (p.rating < filters.minRating) return false;
      if (
        q &&
        !`${p.name} ${p.categoryLabel} ${p.detail} ${p.material} ${p.color}`.toLowerCase().includes(q)
      )
        return false;
      return true;
    });

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "newest")
      sorted.sort((a, b) => Number(b.badge === "New") - Number(a.badge === "New"));
    return sorted;
  }, [filters, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PER_PAGE;
  const visible = filtered.slice(start, start + PER_PAGE);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page header */}
        <section className="border-b border-border bg-sand/40">
          <div className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10 lg:py-14">
            <nav aria-label="Breadcrumb" className="text-[0.7rem] tracking-[0.14em] uppercase text-muted-foreground">
              <PageLink to="/" className="hover:text-ink">
                Home
              </PageLink>
              <span className="px-2">/</span>
              <span className="text-ink">Shop</span>
            </nav>

            <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-[3.4rem]">
              Furniture &amp; Home Décor
            </h1>
            <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
              Discover pieces designed to make your home more comfortable, functional, and beautiful.
            </p>

            {/* Search */}
            <div className="relative mt-8 max-w-xl">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                aria-label="Search products"
                placeholder="Search furniture, décor, collections..."
                className="h-12 w-full border border-border bg-card pl-11 pr-4 text-sm text-ink placeholder:text-muted-foreground focus-visible:border-ink focus-visible:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Category nav */}
        <div className="border-b border-border bg-background">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
            <ul className="-mx-1 flex gap-1 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {catalogCategories.map((c) => {
                const active = filters.category === c.id;
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      aria-current={active ? "true" : undefined}
                      onClick={() => update({ ...filters, category: c.id })}
                      className={
                        active
                          ? "whitespace-nowrap bg-ink px-4 py-2 text-[0.72rem] tracking-[0.14em] uppercase text-primary-foreground"
                          : "whitespace-nowrap px-4 py-2 text-[0.72rem] tracking-[0.14em] uppercase text-muted-foreground transition-colors hover:text-ink"
                      }
                    >
                      {c.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Personalization banner */}
        <div className="mx-auto max-w-[1400px] px-5 pt-8 lg:px-10">
          <Reveal className="flex flex-col gap-5 border border-border bg-card px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div className="flex items-start gap-4">
              <Sparkles aria-hidden="true" className="mt-1 size-5 shrink-0 text-clay" />
              <div>
                <h2 className="font-display text-xl text-ink">Not sure what fits your style?</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Answer a few questions and we'll recommend pieces for your space.
                </p>
              </div>
            </div>
            <Button variant="solid" size="pillSm" asChild className="shrink-0">
              <PageLink to="/personalize">
                Get Personalized Recommendations <ArrowRight aria-hidden="true" className="size-4" />
              </PageLink>
            </Button>
          </Reveal>
        </div>

        {/* Catalog */}
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:px-10 lg:py-14">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <CatalogFilters filters={filters} setFilters={update} onClear={clearAll} />
            </div>
          </aside>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
              <p className="text-xs text-muted-foreground">
                {filtered.length === 0
                  ? "No products"
                  : `Showing ${start + 1}–${Math.min(start + PER_PAGE, filtered.length)} of ${filtered.length} products`}
              </p>

              <div className="flex items-center gap-2">
                <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outlineWarm" size="pillSm" className="lg:hidden">
                      <SlidersHorizontal aria-hidden="true" className="size-4" /> Filter
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto bg-background">
                    <div className="pt-6">
                      <CatalogFilters filters={filters} setFilters={update} onClear={clearAll} />
                    </div>
                  </SheetContent>
                </Sheet>

                <Select
                  value={sort}
                  onValueChange={(v) => {
                    setSort(v);
                    setPage(1);
                  }}
                >
                  <SelectTrigger
                    aria-label="Sort products"
                    className="h-10 w-[11.5rem] rounded-none border-border bg-card text-xs tracking-[0.08em] uppercase"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {sortOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value} className="text-sm">
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {visible.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="grid size-14 place-items-center rounded-full bg-sand">
                  <Search aria-hidden="true" className="size-5 text-muted-foreground" />
                </div>
                <h2 className="mt-6 font-display text-2xl text-ink">No pieces found</h2>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Try changing your filters or search terms.
                </p>
                <Button variant="solid" size="pillSm" className="mt-6" onClick={clearAll}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 xl:grid-cols-4">
                  {visible.map((product, i) => (
                    <Reveal key={product.id} delay={(i % 4) * 60}>
                      <CatalogProductCard product={product} />
                    </Reveal>
                  ))}
                </div>

                {/* Pagination */}
                <nav
                  aria-label="Pagination"
                  className="mt-14 flex flex-wrap items-center justify-center gap-2 border-t border-border pt-8"
                >
                  <button
                    type="button"
                    disabled={current === 1}
                    onClick={() => setPage(current - 1)}
                    className="flex items-center gap-1 px-3 py-2 text-[0.7rem] tracking-[0.14em] uppercase text-muted-foreground transition-colors hover:text-ink disabled:opacity-40 disabled:hover:text-muted-foreground"
                  >
                    <ChevronLeft aria-hidden="true" className="size-4" /> Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      aria-current={n === current ? "page" : undefined}
                      onClick={() => setPage(n)}
                      className={
                        n === current
                          ? "size-9 bg-ink text-xs text-primary-foreground"
                          : "size-9 border border-border text-xs text-muted-foreground transition-colors hover:border-ink hover:text-ink"
                      }
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    type="button"
                    disabled={current === totalPages}
                    onClick={() => setPage(current + 1)}
                    className="flex items-center gap-1 px-3 py-2 text-[0.7rem] tracking-[0.14em] uppercase text-muted-foreground transition-colors hover:text-ink disabled:opacity-40 disabled:hover:text-muted-foreground"
                  >
                    Next <ChevronRight aria-hidden="true" className="size-4" />
                  </button>
                </nav>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
