const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
// const Team = require('../lib/models/Team');
// const Player = require('../lib/models/Player');

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
  });