DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS players;

CREATE TABLE teams (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    city TEXT NOT NULL,
    mascot TEXT NOT NULL,
    division TEXT NOT NULL,
    conference TEXT NOT NULL
);

CREATE TABLE players (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    jersey_number BIGINT,
    team_id BIGINT REFERENCES teams(id)    
);
