'use client';
import { useEffect, useState } from 'react';
import API from '@/lib/api';
import { College } from '@/types';
import CollegeCard from '@/components/CollegeCard';
import { Bookmark } from 'lucide-react';

export default function SavedPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/saved').then(r => { setColleges(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center items-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <Bookmark className="text-blue-600" /> Saved Colleges
      </h1>
      <p className="text-gray-500 mb-8">Your shortlisted colleges</p>
      {colleges.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔖</div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">No saved colleges yet</h2>
          <p className="text-gray-500 mb-6">Browse colleges and click the bookmark icon to save them</p>
          <a href="/colleges" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition">Browse Colleges</a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map(college => <CollegeCard key={college.id} college={college} />)}
        </div>
      )}
    </div>
  );
}
