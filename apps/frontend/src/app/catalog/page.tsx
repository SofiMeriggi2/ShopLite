import Link from "next/link";
import { AddToCartButton } from "../../components/AddToCartButton";

async function getProducts() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/catalog`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    console.error("Error cargando productos", res.status, await res.text());
    return [];
  }
  return res.json();
}

export default async function CatalogPage() {
  const products = await getProducts();

  if (!products.length) {
    return (
      <div className="text-center py-20 text-pink-900">
        <h2 className="text-2xl font-heading font-bold">
          No se pudieron cargar productos 💔
        </h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6">
      {products.map((p: any) => (
        <div
          key={p.id}
          className="bg-white rounded-lg shadow-soft overflow-hidden hover:shadow-lg transition"
        >
          <Link href={`/catalog/${p.slug}`} className="block">
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-64 object-cover"
            />
          </Link>

          <div className="p-4">
            <Link href={`/catalog/${p.slug}`} className="hover:underline">
              <h3 className="text-lg font-heading text-pink-900 mb-2">
                {p.title}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 mb-3">{p.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-pink-700 font-bold text-base">
                ${(p.priceCents / 100).toFixed(2)}
              </span>
              <AddToCartButton product={p} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
