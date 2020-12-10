module.exports = class Player {
    id;
    firstName;
    lastName;
    jerseyNumber;
    team_id;

    constructor(row) {
        this.id = row.id;
        this.firstName = row.firstName;
        this.lastName = row.lastName;
        this.jeresyNumber = row.jeresyNumber;
        this.team_id = row.team_id;
    }



}