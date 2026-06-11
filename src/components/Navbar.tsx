import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--card-border)', background: 'rgba(11, 15, 25, 0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/">
          <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
            Room<span style={{ color: 'var(--accent-color)' }}>Legacy</span>
          </h2>
        </Link>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link href="/explore" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Explore</Link>
          <Link href="/auth" className="btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>Sign In</Link>
        </div>
      </div>
    </nav>
  );
}
