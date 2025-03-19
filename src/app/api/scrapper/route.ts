// src/app/api/scrapper/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Job } from '@/types/job';
import { scrapeJobs } from '@/lib/scraper';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export async function GET(request: Request) {
  try {
    console.log('Starting test route...');
    const { searchParams } = new URL(request.url);
    const keywords = searchParams.get('keywords') || 'Python';
    const geoId = searchParams.get('geoId') || '103644278';
    const pageNum = parseInt(searchParams.get('pageNum') || '1');
    
    const jobs = await scrapeJobs(keywords, geoId, pageNum);
    
    console.log('Test route completed with', jobs.length, 'jobs');
    return NextResponse.json({ success: true, jobs });
  } catch (error) {
    console.error('Error in test route:', error);
    return NextResponse.json({ success: false, error: 'Failed to scrape jobs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const jobs = await request.json() as Job[];
    
    const { error } = await supabase
      .from('jobs')
      .insert(jobs.map((job) => ({
        ...job,
        scrapped_at: new Date().toLocaleString('en-US', { timeZone: 'EST' }),
      })));

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save jobs' },
      { status: 500 }
    );
  }
}

