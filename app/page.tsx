import { prisma } from '@/lib/prisma';
import HomeClient from './home-client';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [allProducts, limitedProducts] = await Promise.all([
    prisma.product.findMany({ orderBy: { reviewCount: 'desc' }, take: 8 }),
    prisma.product.findMany({ where: { limitedEdition: true }, take: 4 }),
  ]);

  return (
    <HomeClient
      products={JSON.parse(JSON.stringify(allProducts ?? []))}
      limitedProducts={JSON.parse(JSON.stringify(limitedProducts ?? []))}
    />
  );
}
