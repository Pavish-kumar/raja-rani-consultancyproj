import React from 'react';
import MainBanner from '../components/MainBanner';
import Categories from '../components/Categories';
import BestSeller from '../components/BestSeller';
import BottomBanner from '../components/BottomBanner';
import NewsLetter from '../components/NewsLetter';

const Home = () => {
  return (
    <div className="mt-10 space-y-20 px-4 md:px-8">
      {/* Main Banner */}
      <section className="bg-pink-100 rounded-3xl shadow-xl overflow-hidden">
        <MainBanner />
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Shop by Categories</h2>
        <Categories />
      </section>

      {/* Best Sellers */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Best Sellers</h2>
        <BestSeller />
      </section>

      {/* Bottom Banner */}
      <section className="bg-yellow-100 rounded-3xl shadow-xl px-6 py-10">
        <BottomBanner />
      </section>

      {/* Newsletter */}
      <section className="bg-white border border-pink-200 rounded-3xl shadow-lg p-8">
        <NewsLetter />
      </section>
    </div>
  );
};

export default Home;
