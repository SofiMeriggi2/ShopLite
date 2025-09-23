"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Product } from "@shoplite/shared";
import { useAuth } from "./AuthContext";

type CartItem = Product & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      setCart([]);
      return;
    }

    let cancelled = false;

    const loadCart = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });

        if (!res.ok) {
          console.error("No se pudo obtener el carrito", res.status, await res.text());
          return;
        }

        const data = await res.json();
        const rawItems = Array.isArray(data?.items)
          ? (data.items as Array<{ quantity: number; product: Product }>)
          : [];

        const items = rawItems
          .filter((item) => item.product)
          .map((item) => ({ ...item.product, quantity: item.quantity }));

        if (!cancelled) {
          setCart(items);
        }
      } catch (error) {
        console.error("Error cargando el carrito", error);
      }
    };

    loadCart();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));

    if (token) {
      void fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: id }),
      }).catch((error) => console.error("No se pudo eliminar el producto", error));
    }
  };

  const clearCart = () => {
    setCart([]);

    if (token) {
      void fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/clear`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch((error) => console.error("No se pudo vaciar el carrito", error));
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
};
