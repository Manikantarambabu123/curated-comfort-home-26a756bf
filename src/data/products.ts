import sofa from "@/assets/p-sofa.jpg";
import table from "@/assets/p-table.jpg";
import chair from "@/assets/p-chair.jpg";
import bed from "@/assets/p-bed.jpg";
import side from "@/assets/p-side.jpg";
import cabinet from "@/assets/p-cabinet.jpg";

import catSofas from "@/assets/cat-sofas.jpg";
import catBeds from "@/assets/cat-beds.jpg";
import catDining from "@/assets/cat-dining.jpg";
import catTables from "@/assets/cat-tables.jpg";
import catStorage from "@/assets/cat-storage.jpg";
import catDecor from "@/assets/cat-decor.jpg";

export type Product = {
  id: string;
  name: string;
  type: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  hoverImage: string;
  badge?: "New" | "Bestseller";
};

export const products: Product[] = [
  {
    id: "arlo-lounge-sofa",
    name: "Arlo Lounge Sofa",
    type: "3-Seater · Oatmeal Bouclé",
    price: 2480,
    rating: 4.8,
    reviews: 214,
    image: sofa,
    hoverImage: catSofas,
    badge: "Bestseller",
  },
  {
    id: "linea-oak-dining-table",
    name: "Linea Oak Dining Table",
    type: "Dining · Solid White Oak",
    price: 1890,
    rating: 4.7,
    reviews: 132,
    image: table,
    hoverImage: catDining,
  },
  {
    id: "form-lounge-chair",
    name: "Form Lounge Chair",
    type: "Seating · Walnut & Leather",
    price: 1150,
    rating: 4.9,
    reviews: 98,
    image: chair,
    hoverImage: catTables,
    badge: "New",
  },
  {
    id: "vera-upholstered-bed",
    name: "Vera Upholstered Bed",
    type: "Bedroom · Queen, Linen",
    price: 2140,
    rating: 4.6,
    reviews: 176,
    image: bed,
    hoverImage: catBeds,
  },
  {
    id: "solace-side-table",
    name: "Solace Side Table",
    type: "Tables · Travertine",
    price: 640,
    rating: 4.5,
    reviews: 74,
    image: side,
    hoverImage: catTables,
  },
  {
    id: "arc-storage-cabinet",
    name: "Arc Storage Cabinet",
    type: "Storage · Fluted Oak",
    price: 1620,
    rating: 4.8,
    reviews: 61,
    image: cabinet,
    hoverImage: catStorage,
    badge: "New",
  },
];

export type Category = {
  id: string;
  name: string;
  count: string;
  image: string;
};

export const categories: Category[] = [
  { id: "sofas", name: "Sofas & Seating", count: "68 pieces", image: catSofas },
  { id: "beds", name: "Beds & Bedroom", count: "54 pieces", image: catBeds },
  { id: "dining", name: "Dining", count: "42 pieces", image: catDining },
  { id: "tables", name: "Tables", count: "37 pieces", image: catTables },
  { id: "storage", name: "Storage", count: "29 pieces", image: catStorage },
  { id: "decor", name: "Home Décor", count: "120 pieces", image: catDecor },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
