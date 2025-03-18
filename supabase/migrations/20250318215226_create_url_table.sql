-- Set the search path to include the scrapper schema (optional, for convenience in this migration)
SET search_path TO public;

-- Create Locations table in the scrapper schema
CREATE TABLE public.locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  geoId VARCHAR NOT NULL,
  source VARCHAR NOT NULL,
  created_at VARCHAR DEFAULT TO_CHAR(NOW() AT TIME ZONE 'EST', 'Mon DD, YYYY HH12:MI AM')
);

-- Create Job_Information table in the scrapper schema
CREATE TABLE public.job_information (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  keywords VARCHAR NOT NULL,
  jobId VARCHAR NOT NULL,
  source VARCHAR NOT NULL,
  created_at VARCHAR DEFAULT TO_CHAR(NOW() AT TIME ZONE 'EST', 'Mon DD, YYYY HH12:MI AM')
);