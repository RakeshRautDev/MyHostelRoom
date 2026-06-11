import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest, { params }: { params: Promise<{ hostel: string; room: string }> }) {
  const session = await getServerSession(authOptions);
  const { hostel, room } = await params;

  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const data = await req.json();

  try {
    // Ensure room exists
    let roomRecord = await prisma.room.findUnique({
      where: {
        hostel_roomNumber: {
          hostel: hostel,
          roomNumber: room,
        }
      }
    });

    if (!roomRecord) {
      roomRecord = await prisma.room.create({
        data: {
          hostel: hostel,
          roomNumber: room
        }
      });
    }

    const startDate = new Date(data.startDate);
    const endDate = data.isCurrent === 'true' || !data.endDate ? null : new Date(data.endDate);

    const occupant = await prisma.occupancy.create({
      data: {
        userId,
        roomId: roomRecord.id,
        startDate,
        endDate,
        placement: data.placement || null,
        socials: data.socials || null,
        isApproved: true, // Auto-approve for now based on user instruction
      }
    });

    return NextResponse.json(occupant);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
