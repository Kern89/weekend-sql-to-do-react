CREATE TABLE "todo" (
    id SERIAL PRIMARY KEY,
    task VARCHAR NOT NULL,
    duedate DATE,
    completed boolean DEFAULT false
);