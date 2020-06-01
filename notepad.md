CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
  name varchar(255) UNIQUE NOT NULL,
  description varchar(255) NOT NULL
);

CREATE TABLE routines (
  id SERIAL PRIMARY KEY,
  "creatorId" INTEGER REFERENCES users(id),
  public BOOLEAN DEFAULT false,
  name VARCHAR(255) UNIQUE NOT NULL,
  goal TEXT NOT NULL
);

CREATE TABLE routine_activities (
  id SERIAL PRIMARY KEY,
  "routineId" INTEGER REFERENCES routines(id),
  "activityId" INTEGER REFERENCES activities(id),
  duration INTEGER,
  count INTEGER,
  UNIQUE("routineId", "activityId")
);

INSERT INTO users (username, password)
VALUES
  ('ironman', 'stark'),
  ('cap', 'rogers'),
  ('thor', 'odinson');