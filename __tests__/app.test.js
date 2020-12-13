const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const Team = require('../lib/models/Team');
const Player = require('../lib/models/Player');

describe('app endpoint', () => {
    beforeEach(() => {
      return pool.query(fs.readFileSync('./data/setup.sql', 'utf-8'));
    });
  
    afterAll(() => {
      return pool.end();
    });
  
    it('creates a new team via POST', async() => {
      const res = await request(app)
        .post('/api/v1/teams')
        .send({
            city: 'Portland, OR',
            mascot: 'Trail Blazers',
            division: 'Northwest',
            conference: 'Western'
        });
        
      expect(res.body).toEqual({
        id: '1',
        city: 'Portland, OR',
        mascot: 'Trail Blazers',
        division: 'Northwest',
        conference: 'Western'
      });
    });

    //Get all test teams
    it('gets all teams after posting two teams', async() => {
        await request(app)
          .post('/api/v1/teams')
          .send({
            city: 'Portland, OR',
            mascot: 'Trail Blazers',
            division: 'Northwest',
            conference: 'Western'
          });

          await request(app)
          .post('/api/v1/teams')
          .send({
            city: 'Los Angeles, CA',
            mascot: 'Lakers',
            division: 'Southwest',
            conference: 'Western'
          });

        const res = await request(app)
          .get('/api/v1/teams');
          
        expect(res.body).toEqual([
            {
                id: '1',
                city: 'Portland, OR',
                mascot: 'Trail Blazers',
                division: 'Northwest',
                conference: 'Western'
            },
            {
                id: '2',
                city: 'Los Angeles, CA',
                mascot: 'Lakers',
                division: 'Southwest',
                conference: 'Western'
            }
        ]);
    });


    //Get by ID test teams

    //Put test teams

    it('updates values for a team based on id', async() => {
        await request(app)
          .post('/api/v1/teams')
          .send({
            city: 'Portland, OR',
            mascot: 'Trail Blazers',
            division: 'Northwest',
            conference: 'Western'
          });

          await request(app)
          .post('/api/v1/teams')
          .send({
            city: 'Los Angeles, CA',
            mascot: 'Lakers',
            division: 'Southwest',
            conference: 'Western'
          });
          
        const id = 2;
        const res = await request(app)
          .put(`/api/v1/teams/${id}`)
          .send({
            city: 'Miami, FL',
            mascot: 'Heat',
            division: 'Southeast',
            conference: 'Eastern'
          })
        expect(res.body).toEqual(
            {
                id: '2',
                city: 'Miami, FL',
                mascot: 'Heat',
                division: 'Southeast',
                conference: 'Eastern'
            }
        );
    });



    //delete test teams
    it('deletes a row in players based on :id', async() => {
        await request(app)
          .post('/api/v1/teams')
          .send({
            city: 'Portland, OR',
            mascot: 'Trail Blazers',
            division: 'Northwest',
            conference: 'Western'
          });

        await request(app)
          .post('/api/v1/teams')
          .send({
            city: 'Los Angeles, CA',
            mascot: 'Lakers',
            division: 'Southwest',
            conference: 'Western'
          });
          
        const id = 1;
        await request(app)
            .delete(`/api/v1/teams/${id}`);
        
        const response = await request(app)
            .get('/api/v1/teams/'); 
    
        expect(response.body).toEqual([
            {
                id: '2',
                city: 'Los Angeles, CA',
                mascot: 'Lakers',
                division: 'Southwest',
                conference: 'Western'
            }
        ]);
      });


    //Post for player
    it('creates a new player via POST', async() => {
        await request(app)
          .post('/api/v1/teams')
          .send({
            city: 'Portland, OR',
            mascot: 'Trail Blazers',
            division: 'Northwest',
            conference: 'Western'
          });
        
        const res = await request(app)
          .post('/api/v1/players')
          .send({
            first_name: 'Damian',
            last_name: 'Lillard',
            jersey_number: 0,
            team_id: 1
          });
          
        expect(res.body).toEqual({
            id: '1',
            first_name: 'Damian',
            last_name: 'Lillard',
            jersey_number: '0',
            team_id: '1'
        });
    });
    //Get all test player
    it('gets all teams after posting two players', async() => {
        await request(app)
          .post('/api/v1/teams')
          .send({
            city: 'Portland, OR',
            mascot: 'Trail Blazers',
            division: 'Northwest',
            conference: 'Western'
          });

        await request(app)
          .post('/api/v1/players')
          .send({
            first_name: 'Damian',
            last_name: 'Lillard',
            jersey_number: 0,
            team_id: 1
          });

        await request(app)
          .post('/api/v1/players')
          .send({
            first_name: 'CJ',
            last_name: 'McCollum',
            jersey_number: 3,
            team_id: 1
          });
          

        const res = await request(app)
          .get('/api/v1/players');
          
        expect(res.body).toEqual([
            {
                id: '1',
                first_name: 'Damian',
                last_name: 'Lillard',
                jersey_number: '0',
                team_id: '1'
            },
            {
                id: '2',
                first_name: 'CJ',
                last_name: 'McCollum',
                jersey_number: '3',
                team_id: '1'
            }
        ]);
    });

    //Get by ID test player
    it('gets a single player by id after posting two players', async() => {
        await request(app)
          .post('/api/v1/teams')
          .send({
            city: 'Portland, OR',
            mascot: 'Trail Blazers',
            division: 'Northwest',
            conference: 'Western'
          });

        await request(app)
          .post('/api/v1/players')
          .send({
            first_name: 'Damian',
            last_name: 'Lillard',
            jersey_number: 0,
            team_id: 1
          });

        await request(app)
          .post('/api/v1/players')
          .send({
            first_name: 'CJ',
            last_name: 'McCollum',
            jersey_number: 3,
            team_id: 1
          });
          
        const id = 2;
        const res = await request(app)
          .get(`/api/v1/players/${id}`);
          
        expect(res.body).toEqual(
            {
                id: '2',
                first_name: 'CJ',
                last_name: 'McCollum',
                jersey_number: '3',
                team_id: '1'
            }
        );
    });


    //Put test player by id

    it('updates values for a player based on id', async() => {
        await request(app)
          .post('/api/v1/teams')
          .send({
            city: 'Portland, OR',
            mascot: 'Trail Blazers',
            division: 'Northwest',
            conference: 'Western'
          });

        await request(app)
          .post('/api/v1/players')
          .send({
            first_name: 'Damian',
            last_name: 'Lillard',
            jersey_number: 0,
            team_id: 1
          });

        await request(app)
          .post('/api/v1/players')
          .send({
            first_name: 'CJ',
            last_name: 'McCollum',
            jersey_number: 3,
            team_id: 1
          });
          
        const id = 2;
        const res = await request(app)
          .put(`/api/v1/players/${id}`)
          .send({
            first_name: 'Jusif',
            last_name: 'Nurkic',
            jersey_number: 27,
            team_id: 1
          })
        expect(res.body).toEqual(
            {
                id: '2',
                first_name: 'Jusif',
                last_name: 'Nurkic',
                jersey_number: '27',
                team_id: '1'
            }
        );
    });





    //delete test player
    it('deletes a row in players based on :id', async() => {
        await request(app)
          .post('/api/v1/teams')
          .send({
            city: 'Portland, OR',
            mascot: 'Trail Blazers',
            division: 'Northwest',
            conference: 'Western'
          });

        await request(app)
          .post('/api/v1/players')
          .send({
            first_name: 'Damian',
            last_name: 'Lillard',
            jersey_number: 0,
            team_id: 1
          });

        await request(app)
          .post('/api/v1/players')
          .send({
            first_name: 'CJ',
            last_name: 'McCollum',
            jersey_number: 3,
            team_id: 1
          });
          
        const id = 1;
        await request(app)
            .delete(`/api/v1/players/${id}`);
        
        const response = await request(app)
            .get('/api/v1/players/'); 
    
        expect(response.body).toEqual([
            {
                id: '2',
                first_name: 'CJ',
                last_name: 'McCollum',
                jersey_number: '3',
                team_id: '1'
            }
        ]);
      });



  });