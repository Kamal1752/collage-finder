import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'College Finder',
  description: 'Find your perfect college in India',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{margin:0,padding:0,background:'#0f172a',color:'white',fontFamily:'sans-serif'}}>
        <nav style={{background:'#1e293b',padding:'1rem 2rem',display:'flex',gap:'2rem',alignItems:'center'}}>
          <span style={{fontWeight:'bold',fontSize:'1.2rem'}}>🎓 College Finder</span>
          <a href="/colleges" style={{color:'#94a3b8',textDecoration:'none'}}>Home</a>
          <a href="/search" style={{color:'#94a3b8',textDecoration:'none'}}>Search</a>
          <a href="/compare" style={{color:'#94a3b8',textDecoration:'none'}}>Compare</a>
        </nav>
        {children}
      </body>
    </html>
  );
}