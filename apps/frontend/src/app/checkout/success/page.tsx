export default function SuccessPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-pink-50">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-pink-900 mb-4">
          ¡Compra realizada con éxito! 🎉
        </h1>
        <p className="text-pink-700">
          Gracias por tu compra. Te enviaremos un correo con los detalles.
        </p>
      </div>
    </div>
  );
}
