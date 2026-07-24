import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProductDetailClient from './product-detail-client';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params?.slug ?? '' },
    include: {
      reviews: { include: { user: { select: { name: true } } }, orderBy: { createdAt: 'desc' }, take: 10 },
    },
  });

  if (!product) return notFound();

  const relatedProducts = await prisma.product.findMany({
    where: { category: product.category, id: { not: product.id } },
    take: 4,
  });

  return (
    <ProductDetailClient
      product={JSON.parse(JSON.stringify(product))}
      relatedProducts={JSON.parse(JSON.stringify(relatedProducts ?? []))}
    />
  );
}
