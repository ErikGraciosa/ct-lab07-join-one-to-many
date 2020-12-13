const pool = require("../utils/pool");

module.exports = class Team {
    id;
    city;
    mascot;
    division;
    conference;

    constructor(row) {
        this.id = row.id;
        this.city = row.city;
        this.mascot = row.mascot;
        this.division = row.division;
        this.conference = row.conference;
    }

    static async insert({ city, mascot, division, conference }) {
        const { rows } = await pool.query(
            'INSERT INTO teams (city, mascot, division, conference) VALUES ($1, $2, $3, $4) RETURNING *',
            [city, mascot, division, conference]
        );
        return new Team(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * FROM teams'
        );
        return rows.map(row => new Team(row));
    }

}