// src/app/url-upload/(index)/page.tsx
import UploadUrlForm from '@/app/components/upload-url-form';

export default function UrlUploadPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Upload Job URL</h1>
      <UploadUrlForm />
    </div>
  );
}

