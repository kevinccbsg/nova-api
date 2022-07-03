const supertest = require('supertest');
const startServer  = require('../../app');

describe('Members endpoints', () => {
  let request;
  beforeAll(async () => {
    const { app } = await startServer();
    request = supertest(app);
  });

  describe('POST "/api/v1/members/:memberId/nominations"', () => {
    it('should return 200 OK', () => (
      request.post('/api/v1/members/id/nominations')
      .expect(200)
    ));
  });
});
