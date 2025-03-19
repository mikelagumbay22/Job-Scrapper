// src/app/scrappe/(index)/page.tsx
'use client';

import { ScrappeData } from '@/app/components/scrappe-data';
import FormScrappe from '@/app/components/form-scrappe';
import { scrapeJobs } from '@/lib/scraper';
import { useState } from 'react';

export default function ScrappePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const handleSubmit = async (data: { keywords: string; geoId: string; pageNum: number }) => {
    try {
      setLoading(true);
      setError(null);
      const start = (data.pageNum - 1) * 25;
      const linkedinUrl = `https://www.linkedin.com/jobs/search/?currentJobId=4178518595&geoId=${data.geoId}&keywords=${encodeURIComponent(data.keywords)}&start=${start}`;
      setUrl(linkedinUrl);
      console.log('Accessing LinkedIn URL:', linkedinUrl);
      
      const jobs = await scrapeJobs(data.keywords, data.geoId, data.pageNum);
      
      // Dispatch custom event with jobs data
      const event = new CustomEvent('jobsUpdate', { detail: jobs });
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch jobs');
      alert('Failed to fetch jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Job Scraper</h1>
      <FormScrappe onSubmit={handleSubmit} />
      {loading && <div className="mt-4">Loading...</div>}
      {error && <div className="mt-4 text-red-500">Error: {error}</div>}
      {url && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p className="font-semibold">LinkedIn URL:</p>
          <p className="break-all">{url}</p>
        </div>
      )}
      <ScrappeData />
    </div>
  );
}

