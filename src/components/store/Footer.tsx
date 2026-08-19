import { PageLink as Link } from "./PageLink";
import { Facebook, Instagram, Youtube } from "lucide-react";

const columns = [
  {
    title: "Shop",
    links: ["All Furniture", "Sofas", "Beds", "Dining", "Tables", "Décor"],
  },
  {
    title: "Customer Care",
    links: ["Contact Us", "Delivery", "Returns", "FAQs"],
  },
  {
    title: "About",
    links: ["Our Story", "Design Philosophy", "Custom Furniture"],
  },
  {
    title: "Account",
    links: ["My Account", "Orders", "Wishlist"],
  },
];

const payments = ["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2.4fr]">
          <div className="min-w-0">
            <p className="font-display text-2xl tracking-[0.4em] text-ink">LUMORA</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Considered furniture and home décor, made with natural materials and built to live
              with for decades.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid size-10 place-items-center border border-border text-foreground/70 transition-colors hover:border-ink hover:text-ink"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title} className="min-w-0">
                <h3 className="eyebrow font-sans">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link to="/shop" className="text-sm text-muted-foreground hover:text-ink">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Lumora Furniture. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-2">
            {payments.map((p) => (
              <span key={p} className="border border-border bg-card px-2.5 py-1 text-[0.65rem] tracking-wide">
                {p}
              </span>
            ))}
          </div>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-ink">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-ink">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
