'use client'

import { useRole } from '../components/RoleProvider'
import { useEffect, useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'
import { useToast } from '../hooks/use-toast'

interface Booking {
  id: number;
  supplierName: string;
  spot: string;
  startDate?: string;
  endDate?: string;
  date?: string;
  status: 'pending' | 'approved' | 'rejected' | 'confirmed';
}

interface WorkerDashboardProps {
  initialBookingRequests: Booking[];
  initialSupplierBookings: Booking[];
}

export function WorkerDashboard({ initialBookingRequests, initialSupplierBookings }: WorkerDashboardProps) {
  const { role } = useRole()
  const [bookingRequests, setBookingRequests] = useState<Booking[]>(initialBookingRequests)
  const { toast } = useToast()

  useEffect(() => {
    if (role !== 'worker') {
      // Redirect to supplier page or show an error
      console.error("Unauthorized access")
    }
  }, [role])

  if (role !== 'worker') return null

  const handleStatusChange = (id: number, newStatus: 'approved' | 'rejected') => {
    setBookingRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    )
    toast({
      title: `Booking ${newStatus}`,
      description: `Booking request has been ${newStatus}.`,
      duration: 3000,
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6" style={{ color: 'rgb(228, 0, 43)' }}>Worker Dashboard</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Booking Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>Spot</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookingRequests.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.supplierName}</TableCell>
                  <TableCell>{booking.spot}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        booking.status === 'approved'
                          ? 'secondary'
                          : booking.status === 'rejected'
                          ? 'destructive'
                          : 'secondary'
                      }
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {booking.status === 'pending' && (
                      <div className="space-x-2">
                        <Button onClick={() => handleStatusChange(booking.id, 'approved')} variant="default" size="sm" style={{ backgroundColor: 'rgb(228, 0, 43)' }}>
                          Approve
                        </Button>
                        <Button onClick={() => handleStatusChange(booking.id, 'rejected')} variant="outline" size="sm">
                          Reject
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
