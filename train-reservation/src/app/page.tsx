import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to Train Seat Reservation
        </h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          Book your train seats easily and efficiently. Start your journey with us today!
        </p>
        <div className="space-x-4">
          <Link href="/auth/login">
            <Button size="lg">Login to Book</Button>
          </Link>
          <Link href="/auth/register">
            <Button size="lg" variant="outline">Register Now</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

