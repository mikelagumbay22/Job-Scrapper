// src/app/api/scrapper/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';


const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export async function POST(request: Request) {
  const jobs = await request.json();
  
  const { error } = await supabase
    .from('jobs')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .insert(jobs.map((job: any) => ({
      ...job,
      scrapped_at: new Date().toLocaleString('en-US', { timeZone: 'EST' }),
    })));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

