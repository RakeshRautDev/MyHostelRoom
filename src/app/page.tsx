'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, History, Users } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [hostel, setHostel] = useState('');
  const [room, setRoom] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (hostel && room) {
      router.push(`/room/${hostel.toLowerCase()}/${room.toLowerCase()}`);
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minHeight: 'calc(100vh - 80px)' }}>
      <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem', background: 'linear-gradient(to right, #60a5fa, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Discover the Legacy of Your Room
        </h1>
        
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Every room has a story. See who lived there before you, where they are now, and leave your mark for the future residents.
        </p>

        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
          <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Find Your Room</h3>
          
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', width: '100%', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
              <input 
                type="text" 
                placeholder="Hostel (e.g., BH12)" 
                className="input-field" 
                value={hostel}
                onChange={(e) => setHostel(e.target.value)}
                required
                style={{ flex: 1 }}
              />
              <input 
                type="text" 
                placeholder="Room (e.g., D104)" 
                className="input-field" 
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                required
                style={{ flex: 1 }}
              />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
              <Search size={20} />
              Explore Legacy
            </button>
          </form>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
          
          <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', color: 'var(--accent-color)' }}>
              <History size={32} />
            </div>
            <h3>Rich History</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Trace back the lineage of occupants and see how the room evolved.</p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', color: 'var(--accent-color)' }}>
              <MapPin size={32} />
            </div>
            <h3>Global Placements</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Discover where alumni who lived in your very room are currently working across the globe.</p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', color: 'var(--accent-color)' }}>
              <Users size={32} />
            </div>
            <h3>Private & Secure</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Current occupants are hidden by default. Only verified room members can see all details.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
