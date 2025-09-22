import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center bg-pink-100">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDlT8_kMLe3eEqQ7AHeSLPuIJGtC7eYTfDsA&s"
          alt="Hero perfumes"
          fill
          className="object-cover opacity-70"
        />
        <h1 className="text-5xl font-bold text-white relative z-10 drop-shadow-lg">
          Belleza que inspira
        </h1>
      </section>

      {/* Categorías */}
      <section className="p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link href="/catalog">
          <div className="shadow-lg rounded-lg overflow-hidden hover:scale-105 transition">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQORHmBl-jJ4HhEho88Sgd_K933SwDLXqZPDA&s"
              alt="Labiales"
              width={400}
              height={400}
              className="object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="font-semibold">Labiales</h2>
            </div>
          </div>
        </Link>

        <Link href="/catalog">
          <div className="shadow-lg rounded-lg overflow-hidden hover:scale-105 transition">
            <Image
              src="https://http2.mlstatic.com/D_NQ_NP_810376-MLA81055132457_112024-O.webp"
              alt="Sombras"
              width={400}
              height={400}
              className="object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="font-semibold">Sombras</h2>
            </div>
          </div>
        </Link>

        <Link href="/catalog">
          <div className="shadow-lg rounded-lg overflow-hidden hover:scale-105 transition">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDlT8_kMLe3eEqQ7AHeSLPuIJGtC7eYTfDsA&s"
              alt="Perfumes"
              width={400}
              height={400}
              className="object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="font-semibold">Perfumes</h2>
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
