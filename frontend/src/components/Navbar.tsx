'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GraduationCap, BookmarkCheck, GitCompare, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="bg-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <GraduationCap size={28} />
          <span>CollegeFinder</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/colleges" className="hover:text-blue-200 transition font-medium">Colleges</Link>
          <Link href="/compare" className="flex items-center gap-1 hover:text-blue-200 transition font-medium">
            <GitCompare size={16} /> Compare
          </Link>
          {user ? (
            <>
              <Link href="/saved" className="flex items-center gap-1 hover:text-blue-200 transition font-medium">
                <BookmarkCheck size={16} /> Saved
              </Link>
              <div className="flex items-center gap-2">
                <User size={16} />
                <span className="text-sm">{user.name}</span>
                <button onClick={logout} className="ml-2 bg-blue-800 hover:bg-blue-900 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <LogOut size={14} /> Logout
                </button>
              </div>
            </>
          ) : (
            <Link href="/auth" className="bg-white text-blue-700 font-semibold px-4 py-1.5 rounded-full hover:bg-blue-50 transition text-sm">
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
