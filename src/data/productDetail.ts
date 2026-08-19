import sofa from "@/assets/p-sofa.jpg";
import catSofas from "@/assets/cat-sofas.jpg";
import hero from "@/assets/hero-living-room.jpg";
import editorial from "@/assets/editorial-collection.jpg";
import craft from "@/assets/custom-craft.jpg";

import { catalogProducts, type CatalogProduct } from "./catalog";

export type GalleryImage = { src: string; caption: string };

export type ProductDetail = {
  price?: number;
  rating?: number;
  reviews?: number;
  categoryLabel: string;
  breadcrumb: string[];
  description: string;
  gallery: GalleryImage[];
  colors: string[];
  materials: string[];
  sizes: string[];
  dimensions: { label: string; value: string }[];
  care: string[];
  warranty: string;
};

const defaultDetail: ProductDetail = {
  categoryLabel: "Lounge Seating",
  breadcrumb: ["Furniture", "Sofas"],
  description:
    "Designed with soft proportions and deep comfort, the Arlo Lounge Sofa brings a relaxed, contemporary feel to living spaces.",
  gallery: [
    { src: sofa, caption: "Front view" },
    { src: catSofas, caption: "Side view" },
    { src: hero, caption: "Interior lifestyle" },
    { src: editorial, caption: "Styled in situ" },
    { src: craft, caption: "Fabric & seam detail" },
  ],
  colors: ["Natural", "Stone", "Charcoal", "Olive"],
  materials: ["Linen", "Bouclé", "Velvet"],
  sizes: ["2 Seater", "3 Seater", "4 Seater"],
  dimensions: [
    { label: "Width", value: "218 cm (3 Seater)" },
    { label: "Depth", value: "96 cm" },
    { label: "Height", value: "78 cm" },
    { label: "Seat height", value: "43 cm" },
    { label: "Weight", value: "62 kg" },
  ],
  care: [
    "Kiln-dried hardwood frame with webbed suspension.",
    "Feather-wrapped foam seat cushions, reversible for even wear.",
    "Vacuum weekly with an upholstery attachment; blot spills immediately.",
    "Removable covers can be professionally dry cleaned.",
  ],
  warranty: "10-year structural warranty on frame and suspension, 3 years on upholstery and cushions.",
};

export const productDetails: Record<string, Partial<ProductDetail>> = {
  "arlo-lounge-sofa": {
    price: 899,
    rating: 4.8,
    reviews: 126,
  },
};

export function getProductDetail(id: string): ProductDetail {
  return { ...defaultDetail, ...(productDetails[id] ?? {}) };
}

export function findProduct(id: string): CatalogProduct {
  return (
    catalogProducts.find((p) => p.id === id) ??
    catalogProducts.find((p) => p.id === "arlo-lounge-sofa") ??
    catalogProducts[0]
  );
}

export const formatGBP = (value: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);

export const ratingBreakdown = [
  { stars: 5, count: 92 },
  { stars: 4, count: 21 },
  { stars: 3, count: 8 },
  { stars: 2, count: 3 },
  { stars: 1, count: 2 },
];

export const reviewsList = [
  {
    name: "Eleanor M.",
    date: "March 2026",
    rating: 5,
    title: "Beautifully made and deeply comfortable",
    body: "The bouclé is soft without feeling delicate and the seat depth is perfect for lounging. Delivery team assembled it in ten minutes.",
    verified: true,
  },
  {
    name: "Daniel R.",
    date: "February 2026",
    rating: 5,
    title: "Worth the wait",
    body: "Ordered the 3 seater in Stone. The proportions are generous but it doesn't overwhelm our living room. Cushions have held their shape.",
    verified: true,
  },
  {
    name: "Priya S.",
    date: "January 2026",
    rating: 4,
    title: "Lovely piece, slightly firmer than expected",
    body: "Gorgeous colour and finish. The seat is firmer than the showroom model at first, though it has softened nicely after a month.",
    verified: true,
  },
];
