export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const userId = (session.user as { id: string }).id;
    const items = await prisma.wishlistItem.findMany({
      where: { userId },
      include: { product: true },
    });
    return NextResponse.json(items ?? []);
  } catch (error: any) {
    console.error('Wishlist fetch error:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const userId = (session.user as { id: string }).id;
    const { productId } = await req.json();

    const existing = await prisma.wishlistItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (existing) {
      await prisma.wishlistItem.delete({ where: { id: existing.id } });
      return NextResponse.json({ added: false });
    }

    await prisma.wishlistItem.create({ data: { userId, productId } });
    return NextResponse.json({ added: true });
  } catch (error: any) {
    console.error('Wishlist error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
