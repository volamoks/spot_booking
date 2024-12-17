import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Welcome to ASP Booking</h1>
      <div className="flex space-x-4">
        <Button asChild>
          <Link href="/supplier">Supplier Dashboard</Link>
        </Button>
        <Button asChild>
          <Link href="/worker/dashboard">Worker Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}

