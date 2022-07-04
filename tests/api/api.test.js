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
    await mongoModels.Nomination.deleteMany({});
  });

  afterAll(async () => {
    await dbClient.disconnect();
  });

  describe('POST "/api/v1/members/:memberId/nominations"', () => {
    it('should 400 BAD REQUEST when response is incomplete', () => (
      request.post('/api/v1/members/nova-member/nominations')
        .send({
          email: 'eren@snk.com',
          description: 'has a great power for nova platform',
        })
        .expect(400)
        .then((response) => {
          expect(response.body.message.includes('must have required property \'score\''))
            .toEqual(true);
        })
    ));

    it('should 400 BAD REQUEST when score has invalid values (talent: -10)', () => (
      request.post('/api/v1/members/nova-member/nominations')
        .send({
          email: 'eren@snk.com',
          description: 'has a great power for nova platform',
          score: {
            involvement: 8,
            talent: -10,
          },
        })
        .expect(400)
        .then((response) => {
          expect(response.body.message.includes('Schema Score/properties/talent must be >= 0'))
            .toEqual(true);
        })
    ));

    it('should 400 BAD REQUEST when score has invalid values (involvement: 88)', () => (
      request.post('/api/v1/members/nova-member/nominations')
        .send({
          email: 'eren@snk.com',
          description: 'has a great power for nova platform',
          score: {
            involvement: 80,
            talent: 10,
          },
        })
        .expect(400)
        .then((response) => {
          expect(response.body.message.includes('Schema Score/properties/involvement must be <= 10'))
            .toEqual(true);
        })
    ));

    it('should not store duplicated recomendations', () => (
      request.post('/api/v1/members/nova-member/nominations')
        .send({
          email: 'eren@snk.com',
          description: 'has a great power for nova platform',
          score: {
            involvement: 8,
            talent: 10,
          },
        })
        .expect(201)
        .then(() => (
          request.post('/api/v1/members/nova-member/nominations')
            .send({
              email: 'eren@snk.com',
              description: 'has a great power for nova platform',
              score: {
                involvement: 8,
                talent: 10,
              },
            })
            .expect(409)
            .then(async () => {
              const nominations = await mongoModels.Nomination.find();
              expect(nominations).toHaveLength(1);
              const [newNomination] = nominations;
              expect(newNomination).toHaveProperty('id', 'email', 'description', 'talent', 'createdAt', 'updatedAt', 'status');
              expect(newNomination).toMatchObject({
                email: 'eren@snk.com',
                description: 'has a great power for nova platform',
                involvement: 8,
                talent: 10,
                status: 'ACCEPTED',
                referrer: 'nova-member',
              });
            })
        ))
    ));

    it(`should return 200 OK and register a new member with 10 points of talent.
      Therefore, it should be marked as accepted`, () => (
      request.post('/api/v1/members/nova-member/nominations')
        .send({
          email: 'eren@snk.com',
          description: 'has a great power for nova platform',
          score: {
            involvement: 8,
            talent: 10,
          },
        })
        .expect(201)
        .then(async ({ body }) => {
          expect(body).toHaveProperty('id');
          const nominations = await mongoModels.Nomination.find();
          expect(nominations).toHaveLength(1);
          const [newNomination] = nominations;
          expect(newNomination).toHaveProperty('id', 'email', 'description', 'talent', 'createdAt', 'updatedAt', 'status');
          expect(newNomination).toMatchObject({
            email: 'eren@snk.com',
            description: 'has a great power for nova platform',
            involvement: 8,
            talent: 10,
            status: 'ACCEPTED',
            referrer: 'nova-member',
          });
        })
    ));

    it('should return 200 OK and register a new member with 2 points of talent, so it should be marked as accepted', () => (
      request.post('/api/v1/members/nova-member/nominations')
        .send({
          email: 'eren@snk.com',
          description: 'has a great power for nova platform',
          score: {
            involvement: 8,
            talent: 2,
          },
        })
        .expect(201)
        .then(async ({ body }) => {
          expect(body).toHaveProperty('id');
          const nominations = await mongoModels.Nomination.find();
          expect(nominations).toHaveLength(1);
          const [newNomination] = nominations;
          expect(newNomination).toMatchObject({
            email: 'eren@snk.com',
            description: 'has a great power for nova platform',
            involvement: 8,
            talent: 2,
            status: 'REJECTED',
            referrer: 'nova-member',
          });
        })
    ));
  });
});
