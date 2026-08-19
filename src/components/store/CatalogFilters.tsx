import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/data/products";
import {
  catalogCategories,
  colorOptions,
  materialOptions,
  priceBounds,
  sizeOptions,
} from "@/data/catalog";

export type Filters = {
  category: string;
  price: [number, number];
  colors: string[];
  materials: string[];
  sizes: string[];
  inStockOnly: boolean;
  minRating: number;
};

export const defaultFilters: Filters = {
  category: "all",
  price: [...priceBounds] as [number, number],
  colors: [],
  materials: [],
  sizes: [],
  inStockOnly: false,
  minRating: 0,
};

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border pb-6">
      <h3 className="eyebrow mb-3.5">{title}</h3>
      {children}
    </div>
  );
}

function Row({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  const id = `f-${label.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-2.5 py-1 text-sm text-foreground">
      <Checkbox id={id} checked={checked} onCheckedChange={onToggle} />
      {label}
    </label>
  );
}

export function CatalogFilters({
  filters,
  setFilters,
  onClear,
}: {
  filters: Filters;
  setFilters: (next: Filters) => void;
  onClear: () => void;
}) {
  const toggle = (key: "colors" | "materials" | "sizes", value: string) => {
    const list = filters[key];
    setFilters({
      ...filters,
      [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    });
  };

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
        <h2 className="font-display text-xl text-ink">Filters</h2>
        <button
          type="button"
          onClick={onClear}
          className="link-underline text-[0.7rem] tracking-[0.14em] uppercase text-muted-foreground hover:text-ink"
        >
          Clear all
        </button>
      </div>

      <Group title="Category">
        <div className="grid gap-1">
          {catalogCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilters({ ...filters, category: c.id })}
              className={
                filters.category === c.id
                  ? "text-left text-sm text-ink"
                  : "text-left text-sm text-muted-foreground transition-colors hover:text-ink"
              }
            >
              <span className={filters.category === c.id ? "border-b border-ink pb-0.5" : ""}>
                {c.label}
              </span>
            </button>
          ))}
        </div>
      </Group>

      <Group title="Price">
        <Slider
          value={filters.price}
          min={priceBounds[0]}
          max={priceBounds[1]}
          step={20}
          onValueChange={(value) =>
            setFilters({ ...filters, price: [value[0], value[1] ?? value[0]] as [number, number] })
          }
          className="mt-2"
        />
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatPrice(filters.price[0])}</span>
          <span>{formatPrice(filters.price[1])}</span>
        </div>
      </Group>

      <Group title="Color">
        {colorOptions.map((c) => (
          <Row key={c} label={c} checked={filters.colors.includes(c)} onToggle={() => toggle("colors", c)} />
        ))}
      </Group>

      <Group title="Material">
        {materialOptions.map((m) => (
          <Row
            key={m}
            label={m}
            checked={filters.materials.includes(m)}
            onToggle={() => toggle("materials", m)}
          />
        ))}
      </Group>

      <Group title="Size">
        {sizeOptions.map((s) => (
          <Row key={s} label={s} checked={filters.sizes.includes(s)} onToggle={() => toggle("sizes", s)} />
        ))}
      </Group>

      <Group title="Availability">
        <Row
          label="In stock only"
          checked={filters.inStockOnly}
          onToggle={() => setFilters({ ...filters, inStockOnly: !filters.inStockOnly })}
        />
      </Group>

      <Group title="Rating">
        <div className="grid gap-1">
          {[0, 4, 4.5, 4.8].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setFilters({ ...filters, minRating: r })}
              className={
                filters.minRating === r
                  ? "text-left text-sm text-ink"
                  : "text-left text-sm text-muted-foreground transition-colors hover:text-ink"
              }
            >
              <span className={filters.minRating === r ? "border-b border-ink pb-0.5" : ""}>
                {r === 0 ? "All ratings" : `${r.toFixed(1)} & up`}
              </span>
            </button>
          ))}
        </div>
      </Group>

      <Button variant="outlineWarm" size="pillSm" onClick={onClear} className="w-full">
        Clear all filters
      </Button>
    </div>
  );
}
