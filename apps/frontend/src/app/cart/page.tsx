"use client";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return <div className="p-6 text-center">Tu carrito está vacío 🛒</div>;
  }

  const total = cart.reduce((sum, p) => sum + p.priceCents * p.quantity, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-pink-900 mb-6">Tu carrito</h1>
      <ul className="space-y-4">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow"
          >
            <div>
              {item.title} <span className="text-sm">x{item.quantity}</span>
            </div>
            <span>
              ${(item.priceCents * item.quantity / 100).toFixed(2)}
            </span>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 text-sm"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-between items-center font-bold">
        <span>Total:</span>
        <span>${(total / 100).toFixed(2)}</span>
      </div>

      <div className="mt-6 flex gap-4">
        <Link href="/checkout" className="flex-1">
          <button className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700">
            Ir al Checkout
          </button>
        </Link>
        <button
          onClick={clearCart}
          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
        >
          Vaciar carrito
        </button>
      </div>
    </div>
  );
}
