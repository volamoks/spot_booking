'use client'

interface BookingSummaryProps {
  dateRange: {
    from: Date
    to: Date
  }
  price: number
}

export function BookingSummary({ dateRange, price }: BookingSummaryProps) {
  const totalDays = ((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 3600 * 24)) + 1
  const totalPrice = totalDays * price

  return (
    <div className="mt-4 p-2 bg-secondary rounded-md">
      <p className="font-medium">Booking Summary:</p>
      <p>From: {dateRange.from.toLocaleDateString()}</p>
      <p>To: {dateRange.to.toLocaleDateString()}</p>
      <p className="font-bold mt-2">
        Total Price: ${totalPrice}
      </p>
    </div>
  )
}
