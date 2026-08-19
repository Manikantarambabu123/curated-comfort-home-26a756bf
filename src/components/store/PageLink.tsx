import type { AnchorHTMLAttributes } from "react";

/**
 * Links to pages that will be built later (shop, cart, account, ...).
 * Rendered as a plain anchor until those routes exist.
 */
export function PageLink({
  to,
  children,
  ...props
}: { to: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={to} {...props}>
      {children}
    </a>
  );
}
