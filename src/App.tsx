/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import SmoothScroll from './components/SmoothScroll';
import Header from './components/Header';
import HeroScroll from './components/HeroScroll';
import ProductSection from './components/ProductSection';
import Categories3D from './components/Categories3D';
import HorizontalStory from './components/HorizontalStory';
import ProductShowcase from './components/ProductShowcase';
import Reviews from './components/Reviews';
import Timeline from './components/Timeline';
import Footer from './components/Footer';

export default function App() {
  return (
    <SmoothScroll>
      <div className="w-full min-h-screen bg-[var(--color-lux-bg)]">
        <Header />
        <main>
          <HeroScroll />
          <ProductSection />
          <HorizontalStory />
          <Categories3D />
          <ProductShowcase />
          <Timeline />
          <Reviews />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
