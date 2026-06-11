'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddOccupant({ params }: { params: Promise<{ hostel: string; room: string }> }) {
  const { hostel, room } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const res = await fetch(`/api/room/${hostel}/${room}/occupants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        router.push(`/room/${hostel}/${room}`);
        router.refresh();
      } else {
        alert("Failed to add record. Please sign in first.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 2rem', minHeight: 'calc(100vh - 80px)' }}>
      <div className="glass-panel animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Add Room Record</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Adding an occupant to {hostel} - {room}.
        </p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Status</label>
            <select name="isCurrent" className="input-field" required>
              <option value="false">Past Occupant</option>
              <option value="true">I am the Current Occupant</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Start Date</label>
              <input type="month" name="startDate" className="input-field" required />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>End Date (Leave blank if current)</label>
              <input type="month" name="endDate" className="input-field" />
            </div>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Current Placement / Company / College</label>
            <input type="text" name="placement" className="input-field" placeholder="e.g., Software Engineer at Google" />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Social Link (LinkedIn/Twitter)</label>
            <input type="url" name="socials" className="input-field" placeholder="https://linkedin.com/in/username" />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '1rem', opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Record'}
          </button>
        </form>
      </div>
    </div>
  );
}
