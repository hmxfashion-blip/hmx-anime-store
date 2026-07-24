import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import WishlistClient from './wishlist-client';

export const dynamic = 'force-dynamic';

export default async function WishlistPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/auth/login');
  const userId = (session.user as { id: string }).id;

  const items = await prisma.wishlistItem.findMany({
    where: { userId },
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  });

  return <WishlistClient items={JSON.parse(JSON.stringify(items ?? []))} />;
}
