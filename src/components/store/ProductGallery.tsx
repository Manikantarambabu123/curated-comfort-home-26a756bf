import { useState } from "react";
import { ZoomIn } from "lucide-react";

import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/data/productDetail";

export function ProductGallery({
  images,
  alt,
}: {
  images: GalleryImage[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const current = images[active]!;

  return (
    <div className="grid gap-3">
      <figure className="min-w-0">
        <div
          className="group relative overflow-hidden bg-sand"
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setOrigin(
              `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`,
            );
          }}
          onMouseLeave={() => setZoom(false)}
        >
          <img
            src={current.src}
            alt={`${alt} — ${current.caption}`}
            width={1200}
            height={1200}
            className={cn(
              "aspect-[4/5] w-full object-cover transition-transform duration-500 sm:aspect-square",
              zoom ? "scale-[1.9]" : "scale-100",
            )}
            style={{ transformOrigin: origin }}
          />
          <button
            type="button"
            onClick={() => setZoom((z) => !z)}
            aria-pressed={zoom}
            className="absolute bottom-3 right-3 inline-flex items-center gap-2 bg-card/90 px-3 py-2 text-[0.65rem] tracking-[0.14em] uppercase text-ink backdrop-blur transition-colors hover:bg-ink hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <ZoomIn aria-hidden="true" className="size-3.5" />
            {zoom ? "Reset" : "Zoom"}
          </button>
        </div>
        <figcaption className="mt-2 text-xs text-muted-foreground">{current.caption}</figcaption>
      </figure>

      <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {images.map((img, i) => (
          <button
            key={img.caption}
            type="button"
            onClick={() => {
              setActive(i);
              setZoom(false);
            }}
            aria-current={i === active}
            aria-label={`View ${img.caption}`}
            className={cn(
              "shrink-0 overflow-hidden border bg-sand transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              i === active ? "border-ink" : "border-transparent hover:border-ink/30",
            )}
          >
            <img
              src={img.src}
              alt=""
              aria-hidden="true"
              width={200}
              height={200}
              loading="lazy"
              className="size-18 object-cover sm:size-20"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
