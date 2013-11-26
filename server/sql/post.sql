CREATE TABLE posts (
  id          SERIAL PRIMARY KEY,
  title       varchar(255),
  author      varchar(255),
  body        text,
  created_at  timestamp default CURRENT_TIMESTAMP,
  updated_at  timestamp default CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION refresh_updated_at_column()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = now();
    RETURN NEW;
  END;
  $$ language 'plpgsql';

CREATE TRIGGER refresh_posts_updated_at BEFORE UPDATE
  ON posts FOR EACH ROW EXECUTE PROCEDURE
  refresh_updated_at_column();
