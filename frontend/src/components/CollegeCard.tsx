'use client';
import Link from 'next/link';
import { MapPin, Star, IndianRupee, TrendingUp, Bookmark, BookmarkCheck } from 'lucide-react';
import { College } from '@/types';
import { useState } from 'react';
import API from '@/lib/api';

interface Props {
  college: College;
  onCompare?: (college: College) => void;
  isInCompare?: boolean;
}

export default function CollegeCard({ college, onCompare, isInCompare }: Props) {
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (saved) {
        await API.delete(`/saved/${college.id}`);
      } else {
        await API.post(`/saved/${college.id}`);
      }
      setSaved(!saved);
    } catch {
      alert('Please login to save colleges!');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      <div className="relative h-44 overflow-hidden">
        <img
          src={college.image_url || 'https://images.unsplash.com/photo-1562774053-701939374585?w=800'}
          alt={college.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${college.type === 'Government' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
            {college.type}
          </span>
        </div>
        <button onClick={handleSave} className="absolute top-3 left-3 bg-white p-1.5 rounded-full shadow hover:scale-110 transition">
          {saved ? <BookmarkCheck size={16} className="text-blue-600" /> : <Bookmark size={16} className="text-gray-500" />}
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-sm leading-tight mb-1 line-clamp-2 h-10">{college.name}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
          <MapPin size={12} /> {college.location}, {college.state}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center bg-yellow-50 rounded-lg p-2">
            <div className="flex items-center justify-center gap-0.5 text-yellow-600 font-bold text-sm">
              <Star size={12} fill="currentColor" /> {college.rating}
            </div>
            <div className="text-xs text-gray-500">Rating</div>
          </div>
          <div className="text-center bg-green-50 rounded-lg p-2">
            <div className="flex items-center justify-center gap-0.5 text-green-600 font-bold text-sm">
              <TrendingUp size={12} /> {college.placement_percentage}%
            </div>
            <div className="text-xs text-gray-500">Placement</div>
          </div>
          <div className="text-center bg-blue-50 rounded-lg p-2">
            <div className="flex items-center justify-center gap-0.5 text-blue-600 font-bold text-sm">
              <IndianRupee size={12} /> {(college.fees_min / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-gray-500">Fees/yr</div>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/colleges/${college.id}`} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center text-sm font-medium py-2 rounded-xl transition">
            View Details
          </Link>
          {onCompare && (
            <button
              onClick={() => onCompare(college)}
              className={`px-3 py-2 rounded-xl text-sm font-medium border transition ${isInCompare ? 'bg-orange-500 text-white border-orange-500' : 'border-blue-300 text-blue-600 hover:bg-blue-50'}`}
            >
              {isInCompare ? '✓' : '+'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
