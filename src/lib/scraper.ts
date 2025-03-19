// src/lib/scraper.ts
import { Job } from '@/types/job';

export async function scrapeJobs(keywords: string, geoId: string, pageNum: number): Promise<Job[]> {
  try {
    const response = await fetch(
      `/api/scrape?keywords=${encodeURIComponent(keywords)}&geoId=${geoId}&pageNum=${pageNum}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error scraping jobs:', error);
    throw error;
  }
}