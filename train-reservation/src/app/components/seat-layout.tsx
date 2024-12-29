'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface SeatLayoutProps {
  bookedSeats: number[]
  onSeatSelect: (seats: number[]) => void
}

export default function SeatLayout({ bookedSeats, onSeatSelect }: SeatLayoutProps) {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([])
  const totalRows = 11
  const seatsPerRow = 7
  const lastRowSeats = 3

  const handleSeatClick = (seatNumber: number) => {
    if (bookedSeats.includes(seatNumber)) return
    
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber))
    } else if (selectedSeats.length < 7) {
      setSelectedSeats([...selectedSeats, seatNumber])
    }
  }

  const handleConfirm = () => {
    if (selectedSeats.length > 0) {
      onSeatSelect(selectedSeats)
      setSelectedSeats([])
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {Array.from({ length: totalRows }).map((_, rowIndex) => {
          const seatsInRow = rowIndex === totalRows - 1 ? lastRowSeats : seatsPerRow
          return (
            <div key={rowIndex} className="flex gap-2 justify-center">
              {Array.from({ length: seatsInRow }).map((_, seatIndex) => {
                const seatNumber = rowIndex * seatsPerRow + seatIndex + 1
                const isBooked = bookedSeats.includes(seatNumber)
                const isSelected = selectedSeats.includes(seatNumber)
                
                return (
                  <button
                    key={seatNumber}
                    onClick={() => handleSeatClick(seatNumber)}
                    className={`
                      w-12 h-12 rounded-lg flex items-center justify-center
                      ${isBooked ? 'bg-red-500 cursor-not-allowed' : 
                        isSelected ? 'bg-green-500' : 'bg-blue-500'}
                      text-white font-bold hover:opacity-90 transition-colors
                    `}
                    disabled={isBooked}
                  >
                    {seatNumber}
                  </button>
                )
              })}
            </div>
          )
        })}
      </div>
      <div className="flex justify-center gap-4">
        <Button
          onClick={handleConfirm}
          disabled={selectedSeats.length === 0}
          className="w-full max-w-xs"
        >
          Confirm Selection ({selectedSeats.length} seats)
        </Button>
      </div>
      <div className="flex justify-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-500 rounded" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-500 rounded" />
          <span>Booked</span>
        </div>
      </div>
    </div>
  )
}

