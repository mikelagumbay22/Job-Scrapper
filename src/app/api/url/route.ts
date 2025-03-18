// src/app/api/url/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export async function POST(request: Request) {
  const { url } = await request.json();
  const urlParams = new URLSearchParams(url.split('?')[1]);
  
  const data = {
    keywords: urlParams.get('keywords') || '',
    geoId: urlParams.get('geoId') || '',
    jobId: urlParams.get('currentJobId') || '',
  };

  const { error: jobInfoError } = await supabase
    .from('job_information')
    .insert({
      keywords: data.keywords,
      jobId: data.jobId,
      source: 'linkedin',
    });

  const { error: locationError } = await supabase
    .from('locations')
    .insert({
      geoId: data.geoId,
      source: 'linkedin',
    });

  if (jobInfoError || locationError) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}