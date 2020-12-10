module.exports = class Player {
    firstName;
    lastName;
    jerseyNumber;
    team_id;

    constructor(row) {
        this.firstName = row.firstName;
        this.lastName = row.lastName;
        this.jeresyNumber = row.jeresyNumber;
        this.team_id = row.team_id;
    }



}