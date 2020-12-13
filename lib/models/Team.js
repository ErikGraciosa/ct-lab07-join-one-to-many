const pool = require('../utils/pool');
const Player = require('./Player')

module.exports = class Team {
    id;
    city;
    mascot;
    division;
    conference;

    constructor(row) {
        this.id = String(row.id);
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

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM teams WHERE id=$1',
            [id]
        );
        return new Team(rows[0]);
    }

    static async update({ city, mascot, division, conference }, id) {
        const { rows } = await pool.query(
            `UPDATE teams
                SET city=$1,
                    mascot=$2,
                    division=$3,
                    conference=$4
                WHERE id=$5
                RETURNING *`,
                [city, mascot, division, conference, id]
        );
        return new Team(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query(
            `SELECT teams.*,
                array_to_json(array_agg(players.*)) AS players
            FROM teams
            JOIN players
            ON teams.id = players.team_id
            WHERE teams.id=$1
            GROUP BY teams.id`,
            [id]
        );

        return {
            ...new Team(rows[0]),
            players: rows[0].players.map(player => new Player(player))
        }
    }
}