"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginInput } from "@shoplite/shared";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: LoginInput) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const { token, user } = await res.json();
        login(token, user); // ✅ ahora pasás los dos argumentos correctos
        router.push("/catalog");
      } else {
        alert("Error al iniciar sesión ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Hubo un problema con la conexión 🚨");
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="card bg-[var(--card)]">
        <h2 className="text-3xl font-bold text-pink-800 mb-4">ONLINE SHOPPING</h2>
        <p className="text-pink-900/70">
          Compra lo que te gusta con una UI baby pink, suave y accesible.
        </p>
      </div>

      <div className="card">
        <h3 className="text-2xl font-semibold text-pink-800 mb-4 text-center">USER LOGIN</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input placeholder="Email" className="input" {...register("email")} />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <input type="password" placeholder="Password" className="input" {...register("password")} />
            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
          </div>
          <button type="submit" className="btn w-full bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
            Ingresar
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          ¿No tenés cuenta?{" "}
          <Link href="/auth/register" className="text-pink-600 hover:underline">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
}
