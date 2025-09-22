// apps/frontend/src/components/ProductCard.tsx
"use client";

import { AddToCartButton } from "./AddToCartButton";

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
      <img
        src={product.image ?? `https://picsum.photos/seed/${product.id}/300/200`}
        alt={product.title}
        className="rounded-lg object-cover w-full h-48 mb-4"
      />
      <h3 className="font-semibold text-pink-900">{product.title}</h3>
      <p className="text-sm text-pink-700/80 mb-2">{product.description}</p>
      <div className="mt-auto flex items-center justify-between">
        <div className="font-bold text-pink-900">
          ${((product.priceCents || 0) / 100).toFixed(2)}
        </div>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
