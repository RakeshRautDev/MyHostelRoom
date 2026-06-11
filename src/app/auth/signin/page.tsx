'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Prototype: just redirect to home
    setTimeout(() => {
      router.push('/');
    }, 500);
  };

  return (
    <div className="container" style={{ padding: '4rem 2rem', minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '3rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Sign In</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Verify your identity to access room legacies.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="email" 
            placeholder="Email Address" 
            className="input-field" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input 
            type="text" 
            placeholder="Full Name" 
            className="input-field" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />
          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '1rem', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
