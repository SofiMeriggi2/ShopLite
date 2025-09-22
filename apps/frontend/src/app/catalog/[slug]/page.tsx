import { AddToCartButton } from "../../../components/AddToCartButton";

async function getProduct(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/catalog/${slug}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;
  try {
    return await res.json();
  } catch {
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
    return (
      <div className="text-center py-24 text-pink-900">
        <h2 className="text-2xl font-heading font-bold">Producto no encontrado</h2>
        <p className="mt-2 text-pink-700/80">Volvé al catálogo y probá con otro.</p>
      </div>
    );
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
