-- Set the search path to include the scrapper schema (optional, for convenience in this migration)
SET search_path TO public;

-- Create Jobs table in the scrapper schema
CREATE TABLE public.jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR NOT NULL,
  company VARCHAR NOT NULL,
  location VARCHAR NOT NULL,
  url VARCHAR UNIQUE NOT NULL,
  posted_at VARCHAR NOT NULL,
  source VARCHAR NOT NULL,
  scrapped_at VARCHAR NOT NULL
);