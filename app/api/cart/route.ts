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
    const items = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });
    return NextResponse.json(items ?? []);
  } catch (error: any) {
    console.error('Cart fetch error:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const userId = (session.user as { id: string }).id;
    const { productId, quantity } = await req.json();

    const item = await prisma.cartItem.upsert({
      where: { userId_productId: { userId, productId } },
      update: { quantity },
      create: { userId, productId, quantity: quantity ?? 1 },
      include: { product: true },
    });
    return NextResponse.json(item);
  } catch (error: any) {
    console.error('Cart update error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const userId = (session.user as { id: string }).id;
    const { productId } = await req.json();

    await prisma.cartItem.deleteMany({ where: { userId, productId } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Cart delete error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
