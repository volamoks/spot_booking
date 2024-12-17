import type { Metadata } from 'next';
import { Geist, Azeret_Mono as Geist_Mono } from 'next/font/google';

import { ThemeProvider } from '../components/ThemeProvider';
import { Toaster } from '../components/ui/toaster';
import { RoleProvider } from '../components/RoleProvider';
import '../app/globals.css';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

const geistSans = Geist({
    subsets: ['latin'],
    variable: '--font-sans',
});

const geistMono = Geist_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
});

export const metadata: Metadata = {
    title: 'Additional Sale Point Booking',
    description: 'Book additional sale points within stores',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
        >
            <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <RoleProvider>
                        <div className="flex flex-col min-h-screen">
                            <Header />
                            <main className="flex-grow container mx-auto p-4">{children}</main>
                            <Footer />
                        </div>
                    </RoleProvider>
                </ThemeProvider>
                <Toaster />
            </body>
        </html>
    );
}
