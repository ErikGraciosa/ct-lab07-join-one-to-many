const pool = require("../utils/pool");

module.exports = class Player {
    id;
    first_name;
    last_name;
    jersey_number;
    team_id;

    constructor(row) {
        this.id = row.id;
        this.first_name = row.first_name;
        this.last_name = row.last_name;
        this.jersey_number = String(row.jersey_number);
        this.team_id = String(row.team_id);
    }

    static async insert({ first_name, last_name, jersey_number, team_id }) {
        const { rows } = await pool.query(
            'INSERT INTO players (first_name, last_name, jersey_number, team_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [first_name, last_name, jersey_number, team_id]
        );

        return new Player(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * FROM players'
        );
        return rows.map(row => new Player(row));
    }

}