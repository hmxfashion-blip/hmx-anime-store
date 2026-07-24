import { PrismaClient, Rarity, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const IMG = {
  tanjiro: 'https://m.media-amazon.com/images/I/81gAze3a7lL.jpg',
  katana: 'https://m.media-amazon.com/images/I/81OrUl60o9L.jpg',
  aot: 'https://www.jollycostume.com/cdn/shop/files/1_0008_O1CN01Avl2aG2CykGOPCTpK__2509678543-0-cib_1200x1200.jpg?v=1723555775',
  naruto: 'https://m.media-amazon.com/images/I/71fhCaR6A8L.jpg',
  luffy: 'https://animeape.com/wp-content/uploads/2023/12/luffy-Streetwear-Hoodie-back.jpg',
  kaneki: 'https://www.turtlewings.co/cdn/shop/files/u4269575468_Real_life_version_of_character_based_on_Ken_Kaneki__4f05fc4e-d9ce-4db9-bfa1-e4c6f43b9865.jpg?v=1752246097&width=1946',
  pochita: 'https://m.media-amazon.com/images/I/616bv-qiXbL.jpg',
  gojo: 'https://m.media-amazon.com/images/I/416By6ttZML.jpg',
};

async function main() {
  const hashedPassword = await bcrypt.hash('johndoe123', 12);
  await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      name: 'John Doe',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  const products = [
    {
      name: 'Demon Slayer Tanjiro Figure',
      slug: 'demon-slayer-tanjiro-figure',
      description: 'Premium collectible Tanjiro Kamado action figure from Demon Slayer: Kimetsu no Yaiba. Hand-painted with incredible detail, featuring dynamic battle pose with Water Breathing technique effects. Standing at 25cm tall with interchangeable accessories.',
      price: 89.99,
      originalPrice: 119.99,
      image: IMG.tanjiro,
      images: [IMG.tanjiro],
      category: 'action-figures',
      animeSeries: 'Demon Slayer',
      rarity: Rarity.EPIC,
      featured: true,
      bestSeller: true,
      rating: 4.8,
      reviewCount: 156,
      stock: 45,
    },
    {
      name: 'Authentic Samurai Katana',
      slug: 'authentic-samurai-katana',
      description: 'Hand-forged Japanese samurai katana with full tang carbon steel blade. Features authentic ray-skin wrapped handle with silk cord, and comes with a premium wooden display stand. Total length: 104cm.',
      price: 249.99,
      originalPrice: 329.99,
      image: IMG.katana,
      images: [IMG.katana],
      category: 'katanas',
      animeSeries: 'Original',
      rarity: Rarity.LEGENDARY,
      featured: true,
      bestSeller: true,
      limitedEdition: true,
      rating: 4.9,
      reviewCount: 89,
      stock: 15,
    },
    {
      name: 'Attack on Titan Scout Cosplay',
      slug: 'attack-on-titan-scout-cosplay',
      description: 'Complete Attack on Titan Survey Corps cosplay set featuring the iconic green cloak with Wings of Freedom emblem, full Scout Regiment uniform with harness, and knee-high boots.',
      price: 149.99,
      originalPrice: 189.99,
      image: IMG.aot,
      images: [IMG.aot],
      category: 'cosplay',
      animeSeries: 'Attack on Titan',
      rarity: Rarity.RARE,
      featured: true,
      newArrival: true,
      rating: 4.6,
      reviewCount: 72,
      stock: 30,
    },
    {
      name: 'Naruto LED Lamp',
      slug: 'naruto-led-lamp',
      description: 'Stunning Naruto Uzumaki themed LED desk lamp with 16 color options and remote control. Features iconic Rasengan design with 3D illusion effect. USB powered.',
      price: 34.99,
      originalPrice: 49.99,
      image: IMG.naruto,
      images: [IMG.naruto],
      category: 'led-lamps',
      animeSeries: 'Naruto',
      rarity: Rarity.UNCOMMON,
      bestSeller: true,
      rating: 4.4,
      reviewCount: 234,
      stock: 120,
    },
    {
      name: 'One Piece Luffy Hoodie',
      slug: 'one-piece-luffy-hoodie',
      description: 'Premium streetwear One Piece Monkey D. Luffy hoodie. High quality cotton blend with detailed print of Gear 5 Luffy. Oversized fit with kangaroo pocket.',
      price: 59.99,
      originalPrice: null,
      image: IMG.luffy,
      images: [IMG.luffy],
      category: 'anime-hoodies',
      animeSeries: 'One Piece',
      rarity: Rarity.COMMON,
      newArrival: true,
      rating: 4.3,
      reviewCount: 98,
      stock: 200,
    },
    {
      name: 'Tokyo Ghoul Kaneki Poster',
      slug: 'tokyo-ghoul-kaneki-poster',
      description: 'High-resolution Tokyo Ghoul Ken Kaneki art poster on premium matte paper. Features the iconic half-ghoul mask design with dramatic red and black color scheme. Size: 61cm x 91cm.',
      price: 24.99,
      originalPrice: 34.99,
      image: IMG.kaneki,
      images: [IMG.kaneki],
      category: 'wall-posters',
      animeSeries: 'Tokyo Ghoul',
      rarity: Rarity.RARE,
      rating: 4.5,
      reviewCount: 167,
      stock: 300,
    },
    {
      name: 'Chainsaw Man Pochita Plush',
      slug: 'chainsaw-man-pochita-plush',
      description: 'Official licensed Chainsaw Man Pochita plush toy. Ultra-soft premium quality with chainsaw pull-cord detail. 30cm tall, perfect for collectors.',
      price: 39.99,
      originalPrice: 54.99,
      image: IMG.pochita,
      images: [IMG.pochita],
      category: 'action-figures',
      animeSeries: 'Chainsaw Man',
      rarity: Rarity.EPIC,
      featured: true,
      newArrival: true,
      rating: 4.7,
      reviewCount: 203,
      stock: 60,
    },
    {
      name: 'Jujutsu Kaisen Gojo Figure',
      slug: 'jujutsu-kaisen-gojo-figure',
      description: 'Ultra-premium Jujutsu Kaisen Gojo Satoru action figure with Infinite Void domain expansion base. Limited production run of 500 pieces worldwide. Features translucent purple effect parts.',
      price: 199.99,
      originalPrice: 279.99,
      image: IMG.gojo,
      images: [IMG.gojo],
      category: 'action-figures',
      animeSeries: 'Jujutsu Kaisen',
      rarity: Rarity.MYTHIC,
      featured: true,
      bestSeller: true,
      limitedEdition: true,
      rating: 5.0,
      reviewCount: 312,
      stock: 8,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  const allProducts = await prisma.product.findMany();
  const adminUser = await prisma.user.findUnique({ where: { email: 'john@doe.com' } });
  if (adminUser) {
    const reviewData = [
      { comment: 'Absolutely incredible detail on this figure! The paint work is museum quality.', rating: 5 },
      { comment: 'Great quality for the price. Shipping was fast and packaging was secure.', rating: 4 },
      { comment: 'This is my third purchase from HMX and they never disappoint!', rating: 5 },
      { comment: 'The colors are vibrant and the build quality is solid. A must-have for collectors.', rating: 5 },
      { comment: 'Good product overall. Minor paint imperfections but still great.', rating: 4 },
    ];
    for (let i = 0; i < Math.min(allProducts.length, reviewData.length); i++) {
      const product = allProducts[i];
      const review = reviewData[i];
      if (product && review) {
        const existing = await prisma.review.findFirst({
          where: { userId: adminUser.id, productId: product.id },
        });
        if (!existing) {
          await prisma.review.create({
            data: { rating: review.rating, comment: review.comment, userId: adminUser.id, productId: product.id },
          });
        }
      }
    }
  }
  console.log('Seed complete!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
