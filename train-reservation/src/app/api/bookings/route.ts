import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/db'
import { verifyAuth } from '@/app/lib/auth'

export async function GET(req: Request) {
  try {
    const userId = await verifyAuth(req)
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const bookings = await prisma.booking.findMany({
      select: {
        seats: true,
      },
    })

    const bookedSeats = bookings.flatMap(booking => booking.seats)
    return NextResponse.json({ bookedSeats })
  } catch (error) {
    console.error('Get bookings error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const userId = await verifyAuth(req)
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { seats } = await req.json()

    if (!seats || !Array.isArray(seats) || seats.length === 0 || seats.length > 7) {
      return NextResponse.json(
        { message: 'Invalid seat selection' },
        { status: 400 }
      )
    }

    // Check if seats are already booked
    const existingBookings = await prisma.booking.findMany({
      select: {
        seats: true,
      },
    })

    const bookedSeats = existingBookings.flatMap(booking => booking.seats)
    const isAnySeatBooked = seats.some(seat => bookedSeats.includes(seat))

    if (isAnySeatBooked) {
      return NextResponse.json(
        { message: 'One or more seats are already booked' },
        { status: 400 }
      )
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        seats,
        userId,
      },
    })

    return NextResponse.json(booking)
  } catch (error) {
    console.error('Create booking error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

