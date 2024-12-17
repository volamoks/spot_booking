'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Calendar } from './ui/calendar'
import { DateRange } from "react-day-picker"
import { useTheme } from 'next-themes'
import { useToast } from '../hooks/use-toast'
import { Zone } from '../types'
import { createBookingRequest } from '../services/bookingRequestService'

interface ZoneCardProps {
  zone: Zone
  getRedColor: () => string
}

export function ZoneCard({ zone, getRedColor }: ZoneCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const { theme } = useTheme()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (dateRange?.from && dateRange?.to) {
      setLoading(true);
      try {
        const result = await createBookingRequest(zone.uniqueId, dateRange.from, dateRange.to);
        if (result.success) {
          toast({
            title: "Booking Requested",
            description: `Your booking for ${zone.uniqueId} from ${dateRange.from.toLocaleDateString()} to ${dateRange.to.toLocaleDateString()} has been requested.`,
            duration: 5000,
          })
          setIsDialogOpen(false)
        } else {
           toast({
            title: "Error",
            description: result.message || "Failed to create booking request.",
            variant: "destructive",
            duration: 5000,
          })
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast({
            title: "Error",
            description: error.message || "An unexpected error occurred.",
            variant: "destructive",
            duration: 5000,
          })
        } else {
          toast({
            title: "Error",
            description: "An unexpected error occurred.",
            variant: "destructive",
            duration: 5000,
          })
        }
      } finally {
        setLoading(false);
      }
    } else {
      toast({
        title: "Error",
        description: "Please select a date range for your booking.",
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open)
    if (!open) {
      setDateRange(undefined)
    }
  }

  return (
    <Card className="bg-secondary">
      <CardHeader>
        <CardTitle className="text-lg">{zone.uniqueId}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-2">{zone.purpose}</p>
        <p className="font-bold mb-2">${zone.price}/day</p>
        <p className="text-sm mb-2">Type: {zone.category}</p>
        <p className="text-sm mb-2">Equipment: {zone.equipment}</p>
        <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
          <DialogTrigger asChild>
            <Button className="w-full" style={{ backgroundColor: getRedColor() }}>Book Now</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Book {zone.uniqueId}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <style>
                {`
                  .rdp-day_selected {
                    background-color: ${getRedColor()} !important;
                  }
                  .rdp-day_booked {
                    background-color: ${theme === 'dark' ? 'rgba(228, 0, 43, 0.5)' : 'rgba(228, 0, 43, 0.3)'} !important;
                    color: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'} !important;
                  }
                  .rdp-day_requested {
                    background-color: ${theme === 'dark' ? 'rgba(0, 122, 255, 0.5)' : 'rgba(0, 122, 255, 0.3)'} !important;
                    color: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'} !important;
                  }
                  .rdp-day_confirmed {
                    background-color: ${theme === 'dark' ? 'rgba(52, 199, 89, 0.5)' : 'rgba(52, 199, 89, 0.3)'} !important;
                    color: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'} !important;
                  }
                  .rdp-day_booked:hover, .rdp-day_requested:hover, .rdp-day_confirmed:hover {
                    opacity: 0.8;
                  }
                  .rdp-months {
                    display: flex !important;
                    gap: 1rem !important;
                  }
                `}
              </style>
              <div className="mb-4">
                <h3 className="font-medium mb-2">Booking Status:</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 mr-2" style={{backgroundColor: theme === 'dark' ? 'rgba(228, 0, 43, 0.5)' : 'rgba(228, 0, 43, 0.3)'}}></div>
                    <span>Booked by other supplier</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 mr-2" style={{backgroundColor: theme === 'dark' ? 'rgba(0, 122, 255, 0.5)' : 'rgba(0, 122, 255, 0.3)'}}></div>
                    <span>Requested to book by you</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 mr-2" style={{backgroundColor: theme === 'dark' ? 'rgba(52, 199, 89, 0.5)' : 'rgba(52, 199, 89, 0.3)'}}></div>
                    <span>Booked by you</span>
                  </div>
                </div>
              </div>
              
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                className="rounded-md border"
                numberOfMonths={2}
                modifiers={{
                  booked: (date) => 
                    zone.bookings.some(booking => 
                      booking.startDate && booking.endDate &&
                      date >= new Date(booking.startDate) && 
                      date <= new Date(booking.endDate) && 
                      booking.status === 'booked'
                    ),
                  requested: (date) => 
                    zone.bookings.some(booking => 
                      booking.startDate && booking.endDate &&
                      date >= new Date(booking.startDate) && 
                      date <= new Date(booking.endDate) && 
                      booking.status === 'requested'
                    ),
                  confirmed: (date) => 
                    zone.bookings.some(booking => 
                      booking.startDate && booking.endDate &&
                      date >= new Date(booking.startDate) && 
                      date <= new Date(booking.endDate) && 
                      booking.status === 'confirmed'
                    ),
                }}
                modifiersClassNames={{
                  booked: 'rdp-day_booked',
                  requested: 'rdp-day_requested',
                  confirmed: 'rdp-day_confirmed',
                }}
                disabled={(date) => {
                  return zone.bookings.some(booking => 
                    booking.startDate && booking.endDate &&
                    date >= new Date(booking.startDate) && 
                    date <= new Date(booking.endDate) && 
                    (booking.status === 'booked' || booking.status === 'confirmed')
                  );
                }}
              />
              {dateRange?.from && dateRange?.to && (
                <div className="mt-4 p-2 bg-secondary rounded-md">
                  <p className="font-medium">Booking Summary:</p>
                  <p>From: {dateRange.from.toLocaleDateString()}</p>
                  <p>To: {dateRange.to.toLocaleDateString()}</p>
                  <p className="font-bold mt-2">
                    Total Price: $
                    {((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 3600 * 24) + 1) * zone.price}
                  </p>
                </div>
              )}
              <Button 
                onClick={handleBooking}
                style={{ backgroundColor: getRedColor() }}
                className="mt-4 w-full"
                disabled={loading}
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
