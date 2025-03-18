// src/app/lib/scraper.ts
import { load, CheerioAPI } from 'cheerio';
import { formatInTimeZone } from 'date-fns-tz';
import { Job } from '@/types/job';

export class JobScraper {
  private parseLinkedIn(html: string): Job[] {
    const $: CheerioAPI = load(html);
    const jobs: Job[] = [];

    $('.jobs-search__results-list li').each((index: number, element) => {
      const $element = $(element);
      
      const title = $element.find('.base-search-card__title').text().trim();
      const company = $element.find('.base-search-card__subtitle').text().trim();
      const location = $element.find('.job-search-card__location').text().trim();
      const url = $element.find('a.base-card__full-link').attr('href') || '';
      const postedAt = $element.find('.job-search-card__listdate').text().trim();

      if (title && company) {
        jobs.push({
          id: crypto.randomUUID(),
          title,
          company,
          location,
          source: 'linkedin',
          url,
          posted_at: postedAt 
            ? formatInTimeZone(new Date(postedAt), 'America/New_York', 'MMM dd, yyyy hh:mm a')
            : formatInTimeZone(new Date(), 'America/New_York', 'MMM dd, yyyy hh:mm a')
        });
      }
    });

    return jobs;
  }
}