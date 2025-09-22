"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setSuccessMessage("Cuenta creada 🎉 Ahora inicia sesión");
      setTimeout(() => router.push("/auth/login"), 2000);
    } else {
      const err = await res.json().catch(() => ({}));
      setErrorMessage(err.message || "Error creando cuenta");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-pink-900 mb-6 text-center">
          Crear cuenta
        </h2>

        {/* Mensajes de éxito o error */}
        {successMessage && (
          <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-800 text-center">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-800 text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("name", { required: "El nombre es obligatorio" })}
            placeholder="Nombre"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message?.toString()}</p>}

          <input
            {...register("email", {
              required: "El email es obligatorio",
              pattern: { value: /^\S+@\S+$/i, message: "Formato de email inválido" },
            })}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message?.toString()}</p>}

          <input
            type="password"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: { value: 6, message: "Mínimo 6 caracteres" },
            })}
            placeholder="Contraseña"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message?.toString()}</p>}

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
          >
            Registrarme
          </button>
        </form>
      </div>
    </div>
  );
}
