import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';

// Mock data for the prototype
const MOCK_DATA = {
  hostel: 'bh12',
  room: 'd104',
  occupants: [
    {
      id: '1',
      name: 'Rakesh Raut',
      startDate: new Date('2024-08-01'),
      endDate: null, // Current occupant
      placement: 'Software Engineer at Google',
      socials: 'https://linkedin.com/in/rakeshraut'
    },
    {
      id: '4',
      name: 'Amit Kumar',
      startDate: new Date('2024-08-01'),
      endDate: null, // Current occupant
      placement: 'Data Scientist at Amazon',
      socials: 'https://linkedin.com/in/amitkumar'
    },
    {
      id: '2',
      name: 'John Doe',
      startDate: new Date('2022-07-01'),
      endDate: new Date('2024-05-01'),
      placement: 'Frontend Developer at Meta',
      socials: 'https://twitter.com/johndoe'
    },
    {
      id: '3',
      name: 'Aarav Sharma',
      startDate: new Date('2019-07-01'),
      endDate: new Date('2022-05-01'),
      placement: 'Product Manager at Microsoft',
      socials: 'https://linkedin.com/in/aaravsharma'
    }
  ]
};

export default async function RoomPage({ params }: { params: Promise<{ hostel: string; room: string }> }) {
  const { hostel, room } = await params;
  
  // For the prototype, we only show mock data if the URL matches bh12/d104
  const isD104 = hostel.toLowerCase() === 'bh12' && room.toLowerCase() === 'd104';
  const occupancies = isD104 ? MOCK_DATA.occupants : [];

  // For prototype purposes, we'll pretend the user is a verified member so they can see everything.
  const canSeeCurrent = true; 

  const currentOccupants = occupancies.filter(o => !o.endDate);
  const pastOccupants = occupancies.filter(o => o.endDate);

  return (
    <div className="container" style={{ padding: '4rem 2rem', minHeight: 'calc(100vh - 80px)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              {hostel} - {room}
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              {occupancies.length} historical records found. {isD104 ? '(Prototype Mock Data)' : ''}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href={`/api/room/${hostel}/${room}/qr`} target="_blank" rel="noreferrer" className="btn-secondary" style={{ display: 'flex', alignItems: 'center' }}>
              View QR
            </a>
            <Link href={`/room/${hostel}/${room}/add`} className="btn-secondary">
              + Add Record
            </Link>
          </div>
        </div>

        {/* Current Occupants Section */}
        <div className="glass-panel" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent-color)' }}></div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
            Current Occupants
          </h3>
          
          {currentOccupants.length > 0 ? (
            canSeeCurrent ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {currentOccupants.map(occupant => (
                  <div key={occupant.id} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                    <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                      {occupant.name?.[0] || '?'}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.2rem' }}>{occupant.name}</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        Since {format(occupant.startDate, 'MMM yyyy')}
                      </p>
                      {occupant.placement && (
                        <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>📍 {occupant.placement}</p>
                      )}
                      {occupant.socials && (
                        <p style={{ marginTop: '0.4rem', fontSize: '0.85rem' }}>
                          <a href={occupant.socials} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-color)', textDecoration: 'underline' }}>View Socials</a>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Privacy Protected. Only verified residents of {hostel}-{room} can view the current occupants.
                </p>
                <Link href="/auth/signin" className="btn-secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>
                  Sign in to verify
                </Link>
              </div>
            )
          ) : (
            <p style={{ color: 'var(--text-secondary)' }}>No current occupants registered yet.</p>
          )}
        </div>

        {/* Timeline Section */}
        <div>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Room Timeline</h3>
          {pastOccupants.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', borderLeft: '2px solid var(--card-border)', paddingLeft: '2rem', marginLeft: '1rem' }}>
              {pastOccupants.map(occ => (
                <div key={occ.id} className="glass-panel animate-fade-in" style={{ padding: '1.5rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-2.6rem', top: '2rem', width: '1rem', height: '1rem', borderRadius: '50%', background: 'var(--text-secondary)', border: '4px solid var(--bg-color)' }}></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ fontSize: '1.2rem' }}>{occ.name}</h4>
                      <p style={{ color: 'var(--accent-color)', fontSize: '0.9rem', fontWeight: 500 }}>
                        {format(occ.startDate, 'MMM yyyy')} - {occ.endDate ? format(occ.endDate, 'MMM yyyy') : 'Present'}
                      </p>
                      {occ.placement && (
                        <p style={{ marginTop: '0.8rem', fontSize: '0.95rem' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Currently at:</span> {occ.placement}
                        </p>
                      )}
                      {occ.socials && (
                        <p style={{ marginTop: '0.4rem', fontSize: '0.9rem' }}>
                          <a href={occ.socials} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-color)', textDecoration: 'underline' }}>View Socials</a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-secondary)' }}>No historical records found for this room.</p>
          )}
        </div>

      </div>
    </div>
  );
}
