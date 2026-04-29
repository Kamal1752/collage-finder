'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import API from '@/lib/api';
import { College } from '@/types';
import { MapPin, Star, Globe, Users, TrendingUp, IndianRupee, BookOpen, MessageSquare } from 'lucide-react';

export default function CollegeDetailPage() {
  const { id } = useParams();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    API.get(`/colleges/${id}`).then(r => { setCollege(r.data); setLoading(false); });
  }, [id]);

  const submitReview = async () => {
    setSubmitting(true);
    try {
      await API.post(`/colleges/${id}/reviews`, review);
      const res = await API.get(`/colleges/${id}`);
      setCollege(res.data);
      setReview({ rating: 5, comment: '' });
      alert('Review submitted!');
    } catch { alert('Please login to submit a review!'); }
    finally { setSubmitting(false); }
  };

  if (loading) return <div className="flex justify-center items-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" /></div>;
  if (!college) return <div className="text-center py-20 text-gray-500">College not found</div>;

  const tabs = ['overview', 'courses', 'placements', 'reviews'];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
        <div className="h-64 relative">
          <img src={college.image_url} alt={college.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-6 text-white">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full mb-2 inline-block ${college.type === 'Government' ? 'bg-green-500' : 'bg-purple-500'}`}>
              {college.type}
            </span>
            <h1 className="text-2xl font-bold">{college.name}</h1>
            <div className="flex items-center gap-1 text-gray-200 text-sm mt-1">
              <MapPin size={14} /> {college.location}, {college.state}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
          {[
            { icon: <Star size={20} className="text-yellow-500" />, value: college.rating, label: 'Rating', bg: 'bg-yellow-50' },
            { icon: <TrendingUp size={20} className="text-green-500" />, value: `${college.placement_percentage}%`, label: 'Placement', bg: 'bg-green-50' },
            { icon: <IndianRupee size={20} className="text-blue-500" />, value: `${college.avg_package} LPA`, label: 'Avg Package', bg: 'bg-blue-50' },
            { icon: <Users size={20} className="text-purple-500" />, value: college.total_students?.toLocaleString(), label: 'Students', bg: 'bg-purple-50' },
          ].map((s, i) => (
            <div key={i} className={`${s.bg} rounded-xl p-3 text-center`}>
              <div className="flex justify-center mb-1">{s.icon}</div>
              <div className="font-bold text-gray-800">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="flex border-b">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-medium capitalize transition ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Overview */}
          {activeTab === 'overview' && (
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">{college.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: 'Established', value: college.established },
                  { label: 'Fees Range', value: `₹${(college.fees_min/1000).toFixed(0)}K - ₹${(college.fees_max/1000).toFixed(0)}K/yr` },
                  { label: 'Type', value: college.type },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-3">
                    <div className="text-xs text-gray-500">{item.label}</div>
                    <div className="font-semibold text-gray-800">{item.value}</div>
                  </div>
                ))}
              </div>
              {college.website && (
                <a href={college.website} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:underline">
                  <Globe size={16} /> Visit Official Website
                </a>
              )}
            </div>
          )}

          {/* Courses */}
          {activeTab === 'courses' && (
            <div>
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><BookOpen size={18} /> Available Courses</h3>
              <div className="space-y-3">
                {college.courses?.map(course => (
                  <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-medium text-gray-800">{course.name}</div>
                      <div className="text-sm text-gray-500">{course.duration} • {course.seats} seats</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">₹{(course.fees/1000).toFixed(0)}K</div>
                      <div className="text-xs text-gray-400">per year</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Placements */}
          {activeTab === 'placements' && (
            <div>
              <h3 className="font-bold text-gray-800 mb-6">Placement Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {[
                  { label: 'Placement Rate', value: `${college.placement_percentage}%`, color: 'text-green-600', bg: 'bg-green-50' },
                  { label: 'Average Package', value: `₹${college.avg_package} LPA`, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Top Recruiters', value: '50+', color: 'text-purple-600', bg: 'bg-purple-50' },
                ].map((s, i) => (
                  <div key={i} className={`${s.bg} rounded-xl p-6 text-center`}>
                    <div className={`text-3xl font-extrabold ${s.color}`}>{s.value}</div>
                    <div className="text-gray-600 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-700 mb-3">Top Recruiting Companies</h4>
                <div className="flex flex-wrap gap-2">
                  {['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant', 'HCL', 'Amazon', 'Google', 'Microsoft'].map(c => (
                    <span key={c} className="bg-white border border-gray-200 px-3 py-1 rounded-full text-sm text-gray-700">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reviews */}
          {activeTab === 'reviews' && (
            <div>
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><MessageSquare size={18} /> Student Reviews</h3>
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Write a Review</h4>
                <div className="flex gap-2 mb-3">
                  {[1,2,3,4,5].map(r => (
                    <button key={r} onClick={() => setReview(v => ({ ...v, rating: r }))}
                      className={`text-2xl transition ${r <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</button>
                  ))}
                </div>
                <textarea
                  placeholder="Share your experience..."
                  value={review.comment}
                  onChange={e => setReview(v => ({ ...v, comment: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-300 mb-3"
                  rows={3}
                />
                <button onClick={submitReview} disabled={submitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-medium transition disabled:opacity-50">
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
              {college.reviews?.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No reviews yet. Be the first!</p>
              ) : (
                <div className="space-y-4">
                  {college.reviews?.map(review => (
                    <div key={review.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-800">{review.user_name}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
