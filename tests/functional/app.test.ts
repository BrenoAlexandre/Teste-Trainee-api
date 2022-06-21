import request from 'supertest';

const app = 'http://localhost:3001';

describe('App', () => {
  it('should return OK', async () => {
    const { text, status } = await request(app).get('/api/healthcheck');
    expect(status).toBe(200);
    expect(text).toBe('OK');
  });
});
