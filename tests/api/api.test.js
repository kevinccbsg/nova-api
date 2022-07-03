const supertest = require('supertest');
const startServer = require('../../app');

describe('Members endpoints', () => {
  let request;
  let mongoModels;
  let dbClient;
  beforeAll(async () => {
    const { app, testingHelper, dbInstance } = await startServer();
    request = supertest(app);
    mongoModels = testingHelper.mongo;
    dbClient = dbInstance;
  });

  beforeEach(async () => {
    await mongoModels.Member.deleteMany({});
  });

  afterAll(async () => {
    await dbClient.disconnect();
  });

  describe('POST "/api/v1/members/:memberId/nominations"', () => {
    it('should return 200 OK and register a new member', () => (
      request.post('/api/v1/members/id/nominations')
        .send({
          email: 'eren@titan.com',
          description: 'has a great power for nova platform',
          score: {
            involvement: 8,
            talent: 10,
          },
        })
        .expect(201)
        .then(async ({ body }) => {
          expect(body).toHaveProperty('id');
          const members = await mongoModels.Member.find();
          expect(members).toHaveLength(1);
          const [newMember] = members;
          expect(newMember).toHaveProperty('id', 'email', 'description', 'talent', 'createdAt', 'updatedAt', 'status');
        })
    ));
  });
});
