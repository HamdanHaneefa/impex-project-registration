-- Create registrations table in Supabase
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  designation TEXT NOT NULL,
  institute TEXT NOT NULL,
  attendees INTEGER NOT NULL,
  food_preference TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for form submissions)
CREATE POLICY "Allow public inserts" ON registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow reads only for authenticated users (for admin)
CREATE POLICY "Allow authenticated reads" ON registrations
  FOR SELECT
  TO authenticated
  USING (true);

-- Optional: Add comment
COMMENT ON TABLE registrations IS 'IFPD Meet 2026 registration data - backup storage';
