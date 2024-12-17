'use client'

import { useEffect, useState } from 'react'
import { useRole } from '../components/RoleProvider'
import { useRouter } from 'next/navigation'
import { PageHeader } from '../components/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Calendar } from '../components/ui/calendar'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { DateRange } from "react-day-picker"
import { useTheme } from 'next-themes'
import { useToast } from '../hooks/use-toast'
import { css } from '@emotion/react'
import { FilterButton } from '../components/filter-button'

interface Booking {
  startDate: string;
  endDate: string;
  status: 'booked' | 'requested' | 'confirmed';
}

interface Spot {
  id: number
  name: string
  price: number
  description: string
  type: string
  bookings: Booking[];
}

interface Store {
  id: number
  name: string
  isPremium: boolean
  size: string
  address: string
  spots: Spot[]
}

interface BookASpotProps {
  initialStores: Store[]
}

export function BookASpot({ initialStores }: BookASpotProps) {
  const { role } = useRole()
  const router = useRouter()
  const [stores, setStores] = useState<Store[]>(initialStores)
  const [expandedStore, setExpandedStore] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sizeFilter, setSizeFilter] = useState("all")
  const [spotTypeFilter, setSpotTypeFilter] = useState("all")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { theme } = useTheme()
  const { toast } = useToast()

  useEffect(() => {
    if (role !== 'supplier') {
      router.push('/worker')
    }
  }, [role, router])

  if (role !== 'supplier') return null

  const toggleExpand = (storeId: number) => {
    setExpandedStore(expandedStore === storeId ? null : storeId)
  }

  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (sizeFilter === "all" || store.size.toLowerCase() === sizeFilter)
  )

  const getRedColor = () => {
    return theme === 'dark' ? 'rgba(228, 0, 43, 0.7)' : 'rgb(228, 0, 43)'
  }

  const handleBooking = (spotName: string) => {
    if (dateRange?.from && dateRange?.to) {
      toast({
        title: "Booking Requested",
        description: `Your booking for ${spotName} from ${dateRange.from.toLocaleDateString()} to ${dateRange.to.toLocaleDateString()} has been requested.`,
        duration: 5000,
      })
      setIsDialogOpen(false)
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
    <div>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold mb-6" style={{ color: getRedColor() }}>Book a Spot</h1>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <Input
              placeholder="Search stores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
          </div>
          <div className="w-full md:w-1/2">
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Filter by size:</h3>
              <div>
                <FilterButton
                  label="All Sizes"
                  isActive={sizeFilter === "all"}
                  onClick={() => setSizeFilter("all")}
                />
                <FilterButton
                  label="Small"
                  isActive={sizeFilter === "small"}
                  onClick={() => setSizeFilter("small")}
                />
                <FilterButton
                  label="Medium"
                  isActive={sizeFilter === "medium"}
                  onClick={() => setSizeFilter("medium")}
                />
                <FilterButton
                  label="Large"
                  isActive={sizeFilter === "large"}
                  onClick={() => setSizeFilter("large")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Filter spots by type:</h3>
          <div>
            <FilterButton
              label="All Types"
              isActive={spotTypeFilter === "all"}
              onClick={() => setSpotTypeFilter("all")}
            />
            <FilterButton
              label="Standard"
              isActive={spotTypeFilter === "standard"}
              onClick={() => setSpotTypeFilter("standard")}
            />
            <FilterButton
              label="Premium"
              isActive={spotTypeFilter === "premium"}
              onClick={() => setSpotTypeFilter("premium")}
            />
            <FilterButton
              label="Budget"
              isActive={spotTypeFilter === "budget"}
              onClick={() => setSpotTypeFilter("budget")}
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredStores.map((store) => (
            <Card key={store.id} className="overflow-hidden border-l-4" style={{ borderLeftColor: getRedColor() }}>
              <CardHeader className="cursor-pointer" onClick={() => toggleExpand(store.id)}>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span>{store.name}</span>
                    {store.isPremium && (
                      <Badge variant="secondary" style={{ backgroundColor: getRedColor(), color: 'white' }}>Premium</Badge>
                    )}
                  </div>
                  {expandedStore === store.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">Size: {store.size}</p>
                <p className="mb-2">Address: {store.address}</p>
                <p className="mb-2">Available Spots: {store.spots.length}</p>
                {expandedStore === store.id && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      {store.spots
                        .filter(spot => spotTypeFilter === "all" || spot.type.toLowerCase() === spotTypeFilter)
                        .map((spot) => (
                        <Card key={spot.id} className="bg-secondary">
                          <CardHeader>
                            <CardTitle className="text-lg">{spot.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm mb-2">{spot.description}</p>
                            <p className="font-bold mb-2">${spot.price}/day</p>
                            <p className="text-sm mb-2">Type: {spot.type}</p>
                            <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
                              <DialogTrigger asChild>
                                <Button className="w-full" style={{ backgroundColor: getRedColor() }}>Book Now</Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Book {spot.name}</DialogTitle>
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
                                    defaultMonth={new Date(2024, 3)} // April 2024
                                    modifiers={{
                                      booked: (date) => 
                                        spot.bookings.some(booking => 
                                          date >= new Date(booking.startDate) && 
                                          date <= new Date(booking.endDate) && 
                                          booking.status === 'booked'
                                        ),
                                      requested: (date) => 
                                        spot.bookings.some(booking => 
                                          date >= new Date(booking.startDate) && 
                                          date <= new Date(booking.endDate) && 
                                          booking.status === 'requested'
                                        ),
                                      confirmed: (date) => 
                                        spot.bookings.some(booking => 
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
                                      return spot.bookings.some(booking => 
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
                                        {((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 3600 * 24) + 1) * spot.price}
                                      </p>
                                    </div>
                                  )}
                                  <Button 
                                    onClick={() => handleBooking(spot.name)}
                                    style={{ backgroundColor: getRedColor() }}
                                    className="mt-4 w-full"
                                  >
                                    Confirm Booking
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
