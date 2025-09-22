// apps/frontend/src/app/layout.tsx
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

export const metadata = {
  title: "ShopLite",
  description: "Ecommerce demo pastel vibes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-pink-50 font-body text-gray-dark">
        <AuthProvider>
          <CartProvider>
            <header className="bg-white shadow-soft sticky top-0 z-50">
              <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="font-heading text-2xl text-primary-dark">
                  ShopLite
                </Link>

                {/* Nav */}
                <nav className="flex gap-6 text-sm font-semibold">
                  <Link href="/catalog" className="hover:text-primary-dark transition">
                    Catalog
                  </Link>
                  <Link href="/cart" className="hover:text-primary-dark transition">
                    Cart
                  </Link>
                  <Link href="/auth/login" className="hover:text-primary-dark transition">
                    Login
                  </Link>
                </nav>
              </div>
            </header>

            <main className="container mx-auto px-6 py-10">{children}</main>

            <footer className="bg-white mt-12 shadow-inner">
              <div className="container mx-auto px-6 py-4 text-center text-sm text-pink-700/70">
                Demo • Pastel vibes ✨
              </div>
            </footer>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
