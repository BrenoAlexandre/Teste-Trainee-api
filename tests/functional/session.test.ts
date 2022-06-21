import request from 'supertest';

const app = 'http://localhost:3001';

describe('Login', () => {
  const userAccessMock = {
    cpf: '12312312311',
    password: '123123',
  };

  it('should return user and and access token', async () => {
    const { status, body } = await request(app)
      .post('/api/v1/login')
      .send(userAccessMock);
    expect(status).toBe(200);
    expect(body).toBeDefined();
  });

  it('should not find the user', async () => {
    const { status, text } = await request(app)
      .post('/api/v1/login')
      .send({ cpf: '', password: '' });
    expect(status).toBe(400);
    expect(text).toMatch('User not found');
  });

  it('should not be able to confirm credentials', async () => {
    const { status, text } = await request(app)
      .post('/api/v1/login')
      .send({ cpf: '12312312311', password: 'wrongPasword' });

    expect(status).toBe(401);
    expect(text).toBe('Credentials are incorrect');
  });
});
