"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const { clearCart } = useCart();

  const handleCheckout = async () => {
    if (!user) {
      alert("Tenés que iniciar sesión primero 🚪");
      router.push("/auth/login");
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (res.ok) {
      alert("Compra realizada con éxito 🛍️");
      clearCart();
      router.push("/catalog");
    } else {
      alert("Error en el checkout");
    }
  };

  return (
    <div className="text-center mt-10">
      <h2 className="text-3xl font-bold mb-4">Finalizar compra</h2>
      <button onClick={handleCheckout} className="btn">
        Confirmar pedido
      </button>
    </div>
  );
}
