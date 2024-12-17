import { PageHeader } from '@/components/page-header'

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="About ASP Booking" 
        description="Learn more about our platform and how it works"
      />
      <div className="prose dark:prose-invert">
        <p>
          ASP Booking is a platform that connects suppliers with stores, allowing them to book additional sale points within various retail locations. Our goal is to create a seamless experience for both suppliers and store owners, maximizing the use of available retail space and increasing sales opportunities.
        </p>
        <h2>How It Works</h2>
        <ol>
          <li>Suppliers browse available stores and spots</li>
          <li>They select their preferred dates and locations</li>
          <li>Store owners review and approve booking requests</li>
          <li>Once approved, suppliers can set up their products in the designated spots</li>
        </ol>
        <h2>Benefits</h2>
        <ul>
          <li>Increased visibility for suppliers' products</li>
          <li>Efficient use of retail space for store owners</li>
          <li>Diverse product offerings for customers</li>
          <li>Flexible booking options to suit various needs</li>
        </ul>
        <p>
          Join ASP Booking today and unlock new opportunities for your business!
        </p>
      </div>
    </div>
  )
}

