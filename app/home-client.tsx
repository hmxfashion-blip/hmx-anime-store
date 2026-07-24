'use client';

import HeroSection from '@/components/home/hero-section';
import CategoriesSection from '@/components/home/categories-section';
import TrendingSection from '@/components/home/trending-section';
import LimitedEditionSection from '@/components/home/limited-edition-section';
import ReviewsSection from '@/components/home/reviews-section';
import NewsletterSection from '@/components/home/newsletter-section';

interface HomeClientProps {
  products: any[];
  limitedProducts: any[];
}

export default function HomeClient({ products, limitedProducts }: HomeClientProps) {
  return (
    <div>
      <HeroSection />
      <CategoriesSection />
      <TrendingSection products={products ?? []} />
      <LimitedEditionSection products={limitedProducts ?? []} />
      <ReviewsSection />
      <NewsletterSection />
    </div>
  );
}
