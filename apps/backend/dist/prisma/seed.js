"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.product.deleteMany();
    const products = [
        {
            slug: "labial-matte-001",
            title: "Labial Matte 001",
            description: "Labial matte de larga duración con acabado aterciopelado.",
            priceCents: 2599,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQORHmBl-jJ4HhEho88Sgd_K933SwDLXqZPDA&s",
        },
        {
            slug: "labial-gloss-002",
            title: "Labial Gloss 002",
            description: "Gloss hidratante con brillo intenso para un look fresco.",
            priceCents: 1999,
            image: "https://http2.mlstatic.com/D_NQ_NP_810376-MLA81055132457_112024-O.webp",
        },
        {
            slug: "labial-shine-003",
            title: "Labial Shine 003",
            description: "Brillo de labios con pigmento ligero y acabado natural.",
            priceCents: 2199,
            image: "https://media.istockphoto.com/id/623846866/es/vector/atractivos-anuncios-de-brillo-de-labios.jpg?s=612x612&w=0&k=20&c=9sDkSg2gNGb3-okMgsLzcaGHb1YnJVBVHKyZCtH75kQ=",
        },
        {
            slug: "labial-nude-004",
            title: "Labial Nude 004",
            description: "Tonos nude para un maquillaje elegante y natural.",
            priceCents: 2399,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3g-frR17iIBoChRIpsy55XBIha0upv0SkOA&s",
        },
        {
            slug: "perfume-lady-million",
            title: "Perfume Lady Million",
            description: "Fragancia icónica con notas florales y frutales.",
            priceCents: 9999,
            image: "https://i.ibb.co/9tXgB8L/Lady-million.jpg",
        },
        {
            slug: "perfume-gold-006",
            title: "Perfume Gold 006",
            description: "Perfume sofisticado con aroma intenso y duradero.",
            priceCents: 8999,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkBJtHih2krZ21o_Mg91qI_TSO-1aamRFewA&s",
        },
        {
            slug: "perfume-glam-007",
            title: "Perfume Glam 007",
            description: "Aroma elegante con notas dulces y cítricas.",
            priceCents: 9499,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDlT8_kMLe3eEqQ7AHeSLPuIJGtC7eYTfDsA&s",
        },
        {
            slug: "perfume-rose-008",
            title: "Perfume Rose 008",
            description: "Fragancia fresca y femenina inspirada en rosas.",
            priceCents: 8799,
            image: "https://i.ibb.co/T8bsJjv/download-3.jpg",
        },
    ];
    for (const product of products) {
        await prisma.product.upsert({
            where: { slug: product.slug },
            update: {},
            create: product,
        });
    }
}
main()
    .then(async () => {
    console.log("🌱 Seed completado con cosméticos reales!");
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error("❌ Error en seed:", e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map