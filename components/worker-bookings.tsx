'use client'

import { useRole } from '../components/RoleProvider'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
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
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'confirmed';
}

interface WorkerBookingsProps {
  initialBookings: Booking[];
}

export function WorkerBookings({ initialBookings }: WorkerBookingsProps) {
  const { role } = useRole()
  const [bookings, setBookings] = useState<Booking[]>(initialBookings)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState<'supplierName' | 'startDate' | 'status'>('startDate')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const { toast } = useToast()

  useEffect(() => {
    if (role !== 'worker') {
      console.error("Unauthorized access")
    }
  }, [role])

  if (role !== 'worker') return null

  const handleStatusChange = (id: number, newStatus: 'approved' | 'rejected') => {
    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    )
    toast({
      title: `Booking ${newStatus}`,
      description: `Booking has been ${newStatus}.`,
      duration: 3000,
    })
  }

  const filteredBookings = bookings.filter(booking => 
    (booking.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     booking.spot.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || booking.status === statusFilter)
  )

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortBy === 'supplierName') {
      return sortOrder === 'asc' 
        ? a.supplierName.localeCompare(b.supplierName)
        : b.supplierName.localeCompare(a.supplierName)
    } else if (sortBy === 'startDate') {
      return sortOrder === 'asc'
        ? new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        : new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    } else {
      return sortOrder === 'asc'
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status)
    }
  })

  const handleSort = (column: 'supplierName' | 'startDate' | 'status') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6" style={{ color: 'rgb(228, 0, 43)' }}>All Bookings</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <Input
          placeholder="Search by supplier or spot..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/3"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => handleSort('supplierName')}>
                  Supplier {sortBy === 'supplierName' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead>Spot</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('startDate')}>
                  Dates {sortBy === 'startDate' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
                  Status {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.supplierName}</TableCell>
                  <TableCell>{booking.spot}</TableCell>
                  <TableCell>{`${booking.startDate} - ${booking.endDate}`}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        booking.status === 'confirmed' || booking.status === 'approved'
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
