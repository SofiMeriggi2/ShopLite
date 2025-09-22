// apps/frontend/src/app/catalog/ProductList.tsx
"use client";

import { AddToCartButton } from "../../components/AddToCartButton";
import ProductCard from "../../components/ProductCard";

export default function ProductList({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
