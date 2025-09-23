import { AddToCartButton } from "../../../components/AddToCartButton";
import type { Product } from "@shoplite/shared";
import { notFound } from "next/navigation";

async function getProduct(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/catalog/${slug}`;
  const res = await fetch(url, { cache: "no-store" });
  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    console.error("Error cargando producto", res.status, await res.text());
    return null;
  }

  try {
    return (await res.json()) as Product;
  } catch (error) {
    console.error("Respuesta inválida del producto", error);
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-8 items-start">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-[460px] object-cover rounded-xl shadow-soft"
      />
      <div>
        <h1 className="text-3xl font-heading text-pink-900 mb-2">{product.title}</h1>
        <p className="text-pink-700/80 mb-6">{product.description}</p>
        <div className="flex items-center gap-4">
          <span className="text-pink-700 font-bold text-xl">
            ${(product.priceCents / 100).toFixed(2)}
          </span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
