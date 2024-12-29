'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SeatLayout from '@/app/components/seat-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function BookingsPage() {
  const [bookedSeats, setBookedSeats] = useState<number[]>([])
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings')
      if (res.status === 401) {
        router.push('/auth/login')
        return
      }
      const data = await res.json()
      setBookedSeats(data.bookedSeats)
    } catch (error) {
      setError('Failed to fetch bookings')
    }
  }

  const handleSeatSelect = async (selectedSeats: number[]) => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seats: selectedSeats }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message)
      }

      await fetchBookings()
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <Card className="max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Book Your Seats</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <SeatLayout
          bookedSeats={bookedSeats}
          onSeatSelect={handleSeatSelect}
        />
      </CardContent>
    </Card>
  )
}

