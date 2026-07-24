import { prisma } from '@/lib/prisma';
import ShopClient from './shop-client';

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  const categories = await prisma.product.findMany({
    select: { category: true },
    distinct: ['category'],
  });
  const seriesList = await prisma.product.findMany({
    select: { animeSeries: true },
    distinct: ['animeSeries'],
  });

  return (
    <ShopClient
      initialProducts={JSON.parse(JSON.stringify(products ?? []))}
      categories={(categories ?? []).map((c: any) => c?.category ?? '')}
      seriesList={(seriesList ?? []).map((s: any) => s?.animeSeries ?? '')}
    />
  );
}
