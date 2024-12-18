import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-background border-t py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-muted-foreground mb-4 md:mb-0">
          © {new Date().getFullYear()} ASP Booking. All rights reserved.
        </div>
        <nav className="flex space-x-4">
          <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
            Privacy Policy
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  )
}
