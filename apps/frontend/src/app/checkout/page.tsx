"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!user) {
      alert("Tenés que iniciar sesión primero 🚪");
      router.push("/auth/login");
      return;
    }

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/cart/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Compra realizada con éxito 🛍️");
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
