"use client";

import { useCart } from "../app/context/CartContext";
import { useAuth } from "../app/context/AuthContext";
import { useState } from "react";

export function AddToCartButton({ product }: { product: any }) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    if (!user) {
      alert("Necesitás iniciar sesión para añadir productos al carrito ✨");
      return;
    }

    setLoading(true);
    addToCart(product); // 👉 ahora sí usa el CartContext
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
