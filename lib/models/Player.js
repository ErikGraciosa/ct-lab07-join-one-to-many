const pool = require("../utils/pool");

module.exports = class Player {
    id;
    first_name;
    last_name;
    jersey_number;
    team_id;

    constructor(row) {
        this.id = String(row.id);
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

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM players WHERE id=$1',
            [id]
        );
        return new Player(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM players WHERE id=$1',
            [id]
        );
        return new Player(rows[0]);
    }

    static async update({ first_name, last_name, jersey_number, team_id }, id) {
        const { rows } = await pool.query(
            `UPDATE players
                SET first_name=$1,
                    last_name=$2,
                    jersey_number=$3,
                    team_id=$4
                WHERE id=$5
                RETURNING *`,
                [first_name, last_name, jersey_number, team_id, id]
        );
        return new Player(rows[0]);
    }

}