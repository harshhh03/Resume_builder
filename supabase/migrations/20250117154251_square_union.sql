/*
  # Create Resume Table

  1. New Tables
    - `resume_data`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `content` (jsonb)
      - `ats_score` (integer)
      - `is_favorite` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `resume_data` table
    - Add policies for authenticated users to:
      - Read their own resumes
      - Create new resumes
      - Update their own resumes
      - Delete their own resumes
*/

CREATE TABLE IF NOT EXISTS resume_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  title text NOT NULL,
  content jsonb NOT NULL,
  ats_score integer NOT NULL DEFAULT 0,
  is_favorite boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE resume_data ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to read their own resumes
CREATE POLICY "Users can read own resumes"
  ON resume_data
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy to allow users to create resumes
CREATE POLICY "Users can create resumes"
  ON resume_data
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to update their own resumes
CREATE POLICY "Users can update own resumes"
  ON resume_data
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to delete their own resumes
CREATE POLICY "Users can delete own resumes"
  ON resume_data
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);