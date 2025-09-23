"use client";

import { useState } from "react";
import type { Product } from "@shoplite/shared";
import { useAuth } from "../app/context/AuthContext";
import { useCart } from "../app/context/CartContext";

export function AddToCartButton({ product }: { product: Product }) {
  const { user, token } = useAuth();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!user) {
      alert("Necesitás iniciar sesión para añadir productos al carrito ✨");
      return;
    }

    setLoading(true);
    addToCart(product); // 👉 ahora sí usa el CartContext

    if (token) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: product.id }),
        });
      } catch (error) {
        console.error("No se pudo sincronizar el carrito", error);
      }
    }

    setTimeout(() => setLoading(false), 400); // feedback visual corto
  };

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      className={`px-4 py-2 rounded-full font-semibold transition
        ${user
          ? "bg-primary hover:bg-primary-dark text-white shadow-soft"
          : "bg-gray-light text-gray cursor-not-allowed"
        }`}
    >
      {loading ? "Añadiendo..." : user ? "Agregar al carrito" : "Inicia sesión"}
    </button>
  );
}
