const supertest = require('supertest');
const startServer  = require('../../app');

describe('Members endpoints', () => {
  let request;
  beforeAll(async () => {
    const { app } = await startServer();
    request = supertest(app);
  });

  describe('POST "/members/:memberId/nominations"', () => {
    it('should return 200 OK', () => (
      request.post('/members/id/nominations')
      .expect(200)
    ));
  });
});
