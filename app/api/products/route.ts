export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const rarity = searchParams.get('rarity');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const series = searchParams.get('series');

    const where: Prisma.ProductWhereInput = {};

    if (category) where.category = category;
    if (rarity) where.rarity = rarity as any;
    if (series) where.animeSeries = series;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { animeSeries: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) (where.price as any).gte = parseFloat(minPrice);
      if (maxPrice) (where.price as any).lte = parseFloat(maxPrice);
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };
    if (sort === 'price-asc') orderBy = { price: 'asc' };
    else if (sort === 'price-desc') orderBy = { price: 'desc' };
    else if (sort === 'newest') orderBy = { createdAt: 'desc' };
    else if (sort === 'bestSeller') orderBy = { reviewCount: 'desc' };
    else if (sort === 'rating') orderBy = { rating: 'desc' };

    const products = await prisma.product.findMany({ where, orderBy });
    return NextResponse.json(products ?? []);
  } catch (error: any) {
    console.error('Products fetch error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
