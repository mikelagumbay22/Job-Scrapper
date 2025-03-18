// src/app/scrappe/(index)/page.tsx
import { ScrappeData } from '@/app/components/scrappe-data';
import FormScrappe from '@/app/components/form-scrappe';

export default async function ScrappePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Job Scraper</h1>
      <FormScrappe onSubmit={async () => {
        'use server';
        // This will be handled by the API route
      }} />
      <ScrappeData />
    </div>
  );
}

