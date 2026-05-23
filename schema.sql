-- Schema for URL Shortener
-- Run with: psql -d URLshortner -f schema.sql

CREATE TABLE IF NOT EXISTS url (
  id SERIAL PRIMARY KEY,
  oldurl TEXT NOT NULL,
  custom TEXT,
  newurl TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

