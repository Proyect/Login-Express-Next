-- SQLite
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  reset_token VARCHAR(255),
  reset_token_expiration BIGINT
);
