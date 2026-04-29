'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import API from '@/lib/api';
import { College } from '@/types';
import { Star, TrendingUp, IndianRupee, Users, MapPin, CheckCircle, XCircle } from 'lucide-react';

function CompareContent() {
  const searchParams = useSearchParams();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids = searchParams.get('ids')?.split(',').map(Number);
    if (ids && ids.length >= 2) {
      API.post('/colleges/compare', { ids }).then(r => { setColleges(r.data); setLoading(false); });
    } else setLoading(false);
  }, []);

  if (loading) return <div className="flex justify-center items-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" /></div>;

  if (colleges.length < 2) return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-4">⚖️</div>
      <h2 className="text-2xl font-bold text-gray-700 mb-2">No Colleges Selected</h2>
      <p className="text-gray-500 mb-6">Go to the colleges page and select 2-3 colleges to compare</p>
      <a href="/colleges" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition">Browse Colleges</a>
    </div>
  );

  const rows = [
    { label: 'Location', key: 'location', render: (c: College) => `${c.location}, ${c.state}` },
    { label: 'Type', key: 'type', render: (c: College) => c.type },
    { label: 'Established', key: 'established', render: (c: College) => c.established },
    { label: 'Rating', key: 'rating', render: (c: College) => <span className="flex items-center gap-1 justify-center"><Star size={14} className="text-yellow-500" />{c.rating}/5</span> },
    { label: 'Placement %', key: 'placement_percentage', render: (c: College) => `${c.placement_percentage}%` },
    { label: 'Avg Package', key: 'avg_package', render: (c: College) => `₹${c.avg_package} LPA` },
    { label: 'Min Fees/yr', key: 'fees_min', render: (c: College) => `₹${(c.fees_min/1000).toFixed(0)}K` },
    { label: 'Max Fees/yr', key: 'fees_max', render: (c: College) => `₹${(c.fees_max/1000).toFixed(0)}K` },
    { label: 'Total Students', key: 'total_students', render: (c: College) => c.total_students?.toLocaleString() },
  ];

  const getBest = (key: string) => {
    if (['rating', 'placement_percentage', 'avg_package', 'total_students'].includes(key)) {
      return Math.max(...colleges.map(c => Number((c as any)[key])));
    }
    if (['fees_min', 'fees_max'].includes(key)) {
      return Math.min(...colleges.map(c => Number((c as any)[key])));
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Compare Colleges</h1>
      <p className="text-gray-500 mb-8">Side-by-side comparison to help you decide</p>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Header */}
        <div className={`grid gap-0`} style={{ gridTemplateColumns: `200px repeat(${colleges.length}, 1fr)` }}>
          <div className="bg-gray-50 p-4 border-b border-r" />
          {colleges.map(college => (
            <div key={college.id} className="p-4 border-b border-r last:border-r-0 text-center bg-blue-50">
              <img src={college.image_url} alt={college.name} className="w-full h-32 object-cover rounded-xl mb-3" />
              <h3 className="font-bold text-gray-800 text-sm leading-tight">{college.name}</h3>
              <div className="flex items-center justify-center gap-1 text-gray-500 text-xs mt-1">
                <MapPin size={11} /> {college.state}
              </div>
            </div>
          ))}
        </div>

        {/* Rows */}
        {rows.map((row, i) => {
          const best = getBest(row.key);
          return (
            <div key={i} style={{ gridTemplateColumns: `200px repeat(${colleges.length}, 1fr)` }}
              className={`grid gap-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              <div className="p-4 border-r font-medium text-gray-600 text-sm flex items-center">{row.label}</div>
              {colleges.map(college => {
                const val = Number((college as any)[row.key]);
                const isBest = best !== null && val === best;
                return (
                  <div key={college.id} className={`p-4 border-r last:border-r-0 text-center text-sm ${isBest ? 'text-green-700 font-bold bg-green-50' : 'text-gray-700'}`}>
                    {row.render(college)}
                    {isBest && <div className="text-xs text-green-600 mt-0.5">✓ Best</div>}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <a href="/colleges" className="text-blue-600 hover:underline text-sm">← Back to Colleges</a>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return <Suspense><CompareContent /></Suspense>;
}
