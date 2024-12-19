import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import { Badge } from 'components/ui/badge';
import { Button } from 'components/ui/button';

interface BookingCardProps {
    id: number;
    storeName: string;
    spotName: string;
    supplierName: string;
    startDate: string;
    endDate: string;
    status: 'pending' | 'approved' | 'rejected';
    onApprove?: (id: number) => void;
    onReject?: (id: number) => void;
}

export function BookingCard({
    id,
    storeName,
    spotName,
    supplierName,
    startDate,
    endDate,
    status,
    onApprove,
    onReject,
}: BookingCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    {storeName} - {spotName}
                    <Badge
                        variant={
                            status === 'approved'
                                ? 'success'
                                : status === 'rejected'
                                ? 'destructive'
                                : 'secondary'
                        }
                    >
                        {status}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>Supplier: {supplierName}</p>
                <p>
                    Period: {startDate} to {endDate}
                </p>
                {status === 'pending' && onApprove && onReject && (
                    <div className="mt-4 space-x-2">
                        <Button
                            onClick={() => onApprove(id)}
                            variant="default"
                            style={{ backgroundColor: 'rgb(228, 0, 43)' }}
                        >
                            Approve
                        </Button>
                        <Button
                            onClick={() => onReject(id)}
                            variant="outline"
                        >
                            Reject
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
