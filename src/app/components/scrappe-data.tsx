// src/app/components/scrappe-data.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Job } from '@/types/job';

export function ScrappeData() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleJobsUpdate = (event: CustomEvent<Job[]>) => {
      setJobs(event.detail);
      setLoading(false);
      setError(null);
    };

    window.addEventListener('jobsUpdate', handleJobsUpdate as EventListener);
    return () => {
      window.removeEventListener('jobsUpdate', handleJobsUpdate as EventListener);
    };
  }, []);

  const saveToSupabase = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/scrapper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobs),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save jobs');
      }
      
      alert('Jobs saved to Supabase');
    } catch (error) {
      console.error('Error saving jobs:', error);
      setError(error instanceof Error ? error.message : 'Failed to save jobs');
      alert('Failed to save jobs');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="mt-4">Loading...</div>;
  if (error) return <div className="mt-4 text-red-500">Error: {error}</div>;

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