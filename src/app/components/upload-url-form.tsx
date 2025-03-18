// src/app/components/upload-url-form.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function UploadUrlForm() {
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/url', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });
    if (response.ok) {
      alert('URL processed and saved');
      setUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="url">LinkedIn Job URL</Label>
        <Input
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.linkedin.com/jobs/search/..."
        />
      </div>
      <Button type="submit">Process URL</Button>
    </form>
  );
}