// src/app/components/scrappe-data.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  url: string;
  posted_at: string;
  source: string;
}

export function ScrappeData() {
  const [jobs] = useState<Job[]>([]);

  const saveToSupabase = async () => {
    const response = await fetch('/api/scrappe', {
      method: 'POST',
      body: JSON.stringify(jobs),
    });
    if (response.ok) {
      alert('Jobs saved to Supabase');
    }
  };

  return (
    <div className="mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Posted At</TableHead>
            <TableHead>Source</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>
                <a href={job.url} target="_blank" rel="noopener noreferrer">
                  Link
                </a>
              </TableCell>
              <TableCell>{job.posted_at}</TableCell>
              <TableCell>{job.source}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {jobs.length > 0 && (
        <Button onClick={saveToSupabase} className="mt-4">
          Save to Supabase
        </Button>
      )}
    </div>
  );
}