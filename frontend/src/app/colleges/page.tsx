'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import API from '@/lib/api';
import { College } from '@/types';
import CollegeCard from '@/components/CollegeCard';
import { Search, Filter, ChevronLeft, ChevronRight, GitCompare } from 'lucide-react';

function CollegesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [colleges, setColleges] = useState<College[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [compareList, setCompareList] = useState<College[]>([]);

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    state: searchParams.get('state') || '',
    type: '',
    fees_max: '',
  });

  const states = ['Tamil Nadu', 'Maharashtra', 'Delhi', 'Karnataka', 'Rajasthan'];

  useEffect(() => { fetchColleges(); }, [page, filters]);

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const params: any = { page, limit: 9, ...filters };
      Object.keys(params).forEach(k => !params[k] && delete params[k]);
      const res = await API.get('/colleges', { params });
      setColleges(res.data.colleges);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch {
      console.error('Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = (college: College) => {
    setCompareList(prev => {
      if (prev.find(c => c.id === college.id)) return prev.filter(c => c.id !== college.id);
      if (prev.length >= 3) { alert('Max 3 colleges for comparison!'); return prev; }
      return [...prev, college];
    });
  };

  const goCompare = () => {
    const ids = compareList.map(c => c.id).join(',');
    router.push(`/compare?ids=${ids}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Explore Colleges <span className="text-blue-600">({total} found)</span>
      </h1>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex flex-wrap gap-3 items-center">
        <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2 flex-1 min-w-48">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            type="text" placeholder="Search colleges..."
            value={filters.search}
            onChange={e => { setFilters(f => ({ ...f, search: e.target.value })); setPage(1); }}
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
        <select value={filters.state} onChange={e => { setFilters(f => ({ ...f, state: e.target.value })); setPage(1); }}
          className="bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none">
          <option value="">All States</option>
          {states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filters.type} onChange={e => { setFilters(f => ({ ...f, type: e.target.value })); setPage(1); }}
          className="bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none">
          <option value="">All Types</option>
          <option value="Government">Government</option>
          <option value="Private">Private</option>
        </select>
        <select value={filters.fees_max} onChange={e => { setFilters(f => ({ ...f, fees_max: e.target.value })); setPage(1); }}
          className="bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none">
          <option value="">Any Fees</option>
          <option value="100000">Under ₹1 Lakh</option>
          <option value="200000">Under ₹2 Lakh</option>
          <option value="300000">Under ₹3 Lakh</option>
        </select>
        <button onClick={() => { setFilters({ search: '', state: '', type: '', fees_max: '' }); setPage(1); }}
          className="text-blue-600 text-sm hover:underline">Clear</button>
      </div>

      {/* Compare Bar */}
      {compareList.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitCompare size={20} className="text-orange-600" />
            <span className="font-medium text-orange-700">Comparing: {compareList.map(c => c.name.split(' ')[0]).join(', ')}</span>
          </div>
          <button onClick={goCompare} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-medium transition">
            Compare Now →
          </button>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl h-80 animate-pulse bg-gray-200" />
          ))}
        </div>
      ) : colleges.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <div className="text-5xl mb-4">🎓</div>
          <p className="text-xl font-medium">No colleges found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map(college => (
            <CollegeCard
              key={college.id} college={college}
              onCompare={handleCompare}
              isInCompare={!!compareList.find(c => c.id === college.id)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="p-2 rounded-xl border border-gray-200 disabled:opacity-40 hover:bg-gray-50">
            <ChevronLeft size={20} />
          </button>
          <span className="text-gray-600">Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="p-2 rounded-xl border border-gray-200 disabled:opacity-40 hover:bg-gray-50">
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function CollegesPage() {
  return <Suspense><CollegesContent /></Suspense>;
}
