'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, Search, MapPin, Star, Users, TrendingUp } from 'lucide-react';

export default function Home() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/colleges?search=${search}`);
  };

  const stats = [
    { icon: <GraduationCap size={32} />, value: '12+', label: 'Top Colleges' },
    { icon: <MapPin size={32} />, value: '8+', label: 'States Covered' },
    { icon: <Star size={32} />, value: '4.5', label: 'Avg Rating' },
    { icon: <TrendingUp size={32} />, value: '90%', label: 'Avg Placement' },
  ];

  const features = [
    { icon: '🔍', title: 'Smart Search', desc: 'Search colleges by name, location, or course with instant results' },
    { icon: '⚖️', title: 'Compare Colleges', desc: 'Side-by-side comparison of fees, placements, ratings and more' },
    { icon: '🔖', title: 'Save & Shortlist', desc: 'Save your favorite colleges and build your shortlist' },
    { icon: '📊', title: 'Detailed Info', desc: 'Courses, placements, reviews and complete college profiles' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full">
              <GraduationCap size={56} />
            </div>
          </div>
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            Find Your Dream College<br />in India 🇮🇳
          </h1>
          <p className="text-blue-100 text-xl mb-10">
            Discover, compare, and shortlist the best engineering colleges across India
          </p>
          <form onSubmit={handleSearch} className="flex max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center pl-4 text-gray-400">
              <Search size={22} />
            </div>
            <input
              type="text"
              placeholder="Search colleges... (e.g. VelTech, IIT, Chennai)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-4 text-gray-800 outline-none text-lg"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 font-bold text-lg transition">
              Search
            </button>
          </form>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            {['Tamil Nadu', 'Maharashtra', 'Delhi', 'Karnataka', 'Rajasthan'].map(state => (
              <button key={state} onClick={() => router.push(`/colleges?state=${state}`)}
                className="bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-full text-sm transition">
                {state}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="flex justify-center text-blue-600 mb-2">{s.icon}</div>
              <div className="text-3xl font-extrabold text-gray-800">{s.value}</div>
              <div className="text-gray-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Why CollegeFinder?</h2>
          <p className="text-center text-gray-500 mb-10">Everything you need to make the right college decision</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-center">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-blue-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Find Your College?</h2>
        <p className="text-blue-100 mb-8">Browse 12+ top Indian colleges with detailed profiles</p>
        <button onClick={() => router.push('/colleges')}
          className="bg-white text-blue-700 font-bold px-10 py-4 rounded-2xl text-lg hover:bg-blue-50 transition shadow-lg">
          Browse All Colleges →
        </button>
      </section>

      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        © 2024 CollegeFinder India. Built for Unstop Internship Task. | Made with ❤️ by Teju
      </footer>
    </div>
  );
}
