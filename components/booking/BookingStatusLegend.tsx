'use client';

import { useTheme } from 'next-themes';

export function BookingStatusLegend() {
    const { theme } = useTheme();

    return (
        <div className="mb-4">
            <h3 className="font-medium mb-2">Booking Status:</h3>
            <div className="space-y-1 text-sm">
                <div className="flex items-center">
                    <div
                        className="w-4 h-4 mr-2"
                        style={{
                            backgroundColor:
                                theme === 'dark'
                                    ? 'rgba(228, 0, 43, 0.5)'
                                    : 'rgba(228, 0, 43, 0.3)',
                        }}
                    />
                    <span>Не доступно</span>
                </div>
                <div className="flex items-center">
                    <div
                        className="w-4 h-4 mr-2"
                        style={{
                            backgroundColor:
                                theme === 'dark'
                                    ? 'rgba(0, 122, 255, 0.5)'
                                    : 'rgba(0, 122, 255, 0.3)',
                        }}
                    />
                    <span>Запрошено</span>
                </div>
                <div className="flex items-center">
                    <div
                        className="w-4 h-4 mr-2"
                        style={{
                            backgroundColor:
                                theme === 'dark'
                                    ? 'rgba(52, 199, 89, 0.5)'
                                    : 'rgba(52, 199, 89, 0.3)',
                        }}
                    />
                    <span>Подтверждено</span>
                </div>
            </div>
        </div>
    );
}
