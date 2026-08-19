import { PageLink as Link } from "./PageLink";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Shop", to: "/shop" },
  { label: "Furniture", to: "/furniture" },
  { label: "Home Décor", to: "/decor" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Collections", to: "/collections" },
];

const subNav = [
  "Sofas & Seating",
  "Beds & Bedroom",
  "Dining",
  "Tables",
  "Storage",
  "Lighting",
  "Custom Orders",
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled ? "border-border bg-background/95 backdrop-blur" : "border-transparent bg-background",
      )}
    >
      <p className="bg-ink py-2 text-center text-[0.68rem] tracking-[0.18em] uppercase text-primary-foreground">
        Complimentary delivery on orders over $999
      </p>

      <div className="mx-auto grid max-w-[1400px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 lg:px-10">
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center -ml-2"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <Link
          to="/"
          className="justify-self-center font-display text-2xl tracking-[0.4em] text-ink lg:justify-self-start lg:text-[1.6rem]"
        >
          LUMORA
        </Link>

        <nav
          aria-label="Primary"
          className="hidden justify-center gap-9 lg:flex"
        >
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="link-underline text-[0.82rem] tracking-[0.1em] uppercase text-foreground/80 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <button type="button" aria-label="Search" className="grid size-10 place-items-center hover:text-primary">
            <Search className="size-[1.15rem]" />
          </button>
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="hidden size-10 place-items-center hover:text-primary sm:grid"
          >
            <Heart className="size-[1.15rem]" />
          </Link>
          <Link
            to="/account"
            aria-label="Account"
            className="hidden size-10 place-items-center hover:text-primary sm:grid"
          >
            <User className="size-[1.15rem]" />
          </Link>
          <Link to="/cart" aria-label="Shopping bag, 2 items" className="relative grid size-10 place-items-center hover:text-primary">
            <ShoppingBag className="size-[1.15rem]" />
            <span className="absolute right-0.5 top-1 grid min-w-4 place-items-center rounded-full bg-accent px-1 text-[0.6rem] leading-4 text-accent-foreground">
              2
            </span>
          </Link>
        </div>
      </div>

      <div className="hidden border-t border-border/70 lg:block">
        <ul className="mx-auto flex max-w-[1400px] items-center gap-8 overflow-x-auto px-10 py-2.5">
          {subNav.map((item) => (
            <li key={item}>
              <Link
                to="/shop"
                className="whitespace-nowrap text-xs text-muted-foreground transition-colors hover:text-ink"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col px-5 py-2">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/70 py-4 text-sm tracking-[0.12em] uppercase"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-6 py-5 text-sm text-muted-foreground">
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/account">Account</Link>
              <Link to="/shop">Custom Orders</Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
