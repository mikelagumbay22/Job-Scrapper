// src/app/components/form-scrappe.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormData {
  keywords: string;
  geoId: string;
  pageNum: number;
}

interface FormScrappeProps {
  onSubmit: (data: FormData) => void;
}

export default function FormScrappe({ onSubmit }: FormScrappeProps) {
  const [formData, setFormData] = useState<FormData>({
    keywords: 'Media Buyer',
    geoId: '103644278',
    pageNum: 1,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="keywords">Keywords</Label>
        <Input
          id="keywords"
          value={formData.keywords}
          onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
          placeholder="media buyer"
        />
      </div>
      <div>
        <Label htmlFor="geoId">Geo ID</Label>
        <Input
          id="geoId"
          value={formData.geoId}
          onChange={(e) => setFormData({ ...formData, geoId: e.target.value })}
          placeholder="103644278"
        />
      </div>
      <div>
        <Label htmlFor="pageNum">Page Number</Label>
        <Input
          id="pageNum"
          type="number"
          value={formData.pageNum}
          onChange={(e) => setFormData({ ...formData, pageNum: parseInt(e.target.value) })}
          placeholder="1"
        />
      </div>
      <Button type="submit">Scrape Jobs</Button>
    </form>
  );
}