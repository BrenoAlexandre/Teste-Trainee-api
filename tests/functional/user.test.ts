import request from 'supertest';
import config from '../../src/config/config';
import User from '../../src/database/entities/User.Entity';
import { Role } from '../../src/models/user.model';
import { signJwt } from '../../src/utils/jwt.utils';

const app = 'http://localhost:3001';

describe('Users api v1 routes', () => {
  const token = signJwt(
    { role: 'admin' },
    { expiresIn: config.accessTokenTtl }
  );

  const newUserModel = {
    name: 'test user',
    cpf: '12345612399',
    password: '123123',
    confirmPassword: '123123',
    birthdate: '01/13/2000',
    obs: '',
    role: Role.user,
  };

  let user: User;

  describe(`route('/')`, () => {
    // Make sure to have already ran *yarn seed:run* command

    it('should get all users from database', async () => {
      const { status, body } = await await request(app)
        .get('/api/v1/users')
        .set('authorization', `Bearer ${token}`);

      const { length: bodyLength } = body;

      expect(status).toBe(200);
      expect(body).toHaveLength(bodyLength);
    });

    it('should receive Token error when calling get method', async () => {
      const { status, body } = await request(app).get('/api/v1/users');

      expect(status).toBe(401);
      expect(body.error).toBe('Token error');
    });

    it('should create a new user', async () => {
      const { status, body } = await request(app)
        .post('/api/v1/users')
        .send(newUserModel)
        .set('authorization', `Bearer ${token}`);

      expect(status).toBe(201);
      expect(body);
      user = body;
    });

    it('should not be able to create a new user due to duplicate cpf', async () => {
      const { status, text } = await request(app)
        .post('/api/v1/users')
        .send(newUserModel)
        .set('authorization', `Bearer ${token}`);

      expect(status).toBe(409);
      expect(text).toBe('User cpf is already registered');
    });
  });

  describe(`route(/:id)`, () => {
    it('should find a user by id', async () => {
      const { status, body } = await request(app)
        .get(`/api/v1/users/${user.id}`)
        .set('authorization', `Bearer ${token}`);

      expect(status).toBe(200);
      expect(body).toMatchObject({ ...user, birthdate: '2000-01-13' });
    });

    it('should edit a user by id', async () => {
      const { status, body } = await request(app)
        .put(`/api/v1/users/${user.id}`)
        .send({ ...user, obs: 'Usuário de teste, apague-o por favor' })
        .set('authorization', `Bearer ${token}`);

      expect(status).toBe(200);
      expect(body).toMatchObject({
        ...user,
        obs: 'Usuário de teste, apague-o por favor',
        birthdate: '2000-01-13',
        updated_at: body.updated_at,
      });
    });

    it('should delete a user by id', async () => {
      const { status } = await request(app)
        .delete(`/api/v1/users/${user.id}`)
        .set('authorization', `Bearer ${token}`);

      expect(status).toBe(200);
    });
  });
});
