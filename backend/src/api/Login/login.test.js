import mongoose from 'mongoose';
import supertest from 'supertest';

import app from '../../app';
import User from '../User/user';

const api = supertest(app);

beforeAll((done) => {
  done();
});

describe('POST /api/v1/auth/login', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const user = new User({
      name: 'Jhon',
      lastName: 'Doe',
      email: 'jhon.doe@gmail.com',
      country: 'Chile',
      password: 'aleman234',
      passwordConfirm: 'aleman234',
    });

    await user.save();
  });

  test('Should return 200 status code', async () => {
    const user = {
      email: 'jhon.doe@gmail.com',
      password: 'aleman234',
    };

    await api
      .post('/api/v1/auth/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  test('Should return an error if the password is wrong', async () => {
    const user = {
      email: 'jhon.doe@gmail.com',
      password: 'badPassword',
    };

    const res = await api
      .post('/api/v1/auth/login')
      .send(user);

    expect(res.status).toEqual(400);
    expect(res.error.text).toContain('La contraseña es incorrecta');
  });

  test('Should return an error if user is not found', async () => {
    const user = {
      email: 'baduser@gmail.com',
      password: 'badPassword',
    };

    const res = await api
      .post('/api/v1/auth/login')
      .send(user);

    expect(res.status).toEqual(400);
    expect(res.error.text).toContain('Usuario no encontrado');
  });
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
