import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function GET(req: NextRequest, { params }: { params: Promise<{ hostel: string; room: string }> }) {
  const { hostel, room } = await params;
  const url = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/room/${hostel}/${room}`;
  
  try {
    const qrBuffer = await QRCode.toBuffer(url, {
      type: 'png',
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });

    return new NextResponse(qrBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400'
      }
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to generate QR Code' }, { status: 500 });
  }
}
