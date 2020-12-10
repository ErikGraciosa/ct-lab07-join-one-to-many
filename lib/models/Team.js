module.exports = class Team {
    city;
    mascot;
    division;
    conference;

    constructor(row) {
        this.location = row.city;
        this.mascot = row.mascot;
        this.make = row.division;
        this.conference = row.conference;
    }

}