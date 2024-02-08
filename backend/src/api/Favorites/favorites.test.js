import supertest from 'supertest';
import mongoose from 'mongoose';

import app from '../../app';
import Favs from './favorites';
import { User } from '../User';

const api = supertest(app);

beforeAll((done) => {
  done();
});

describe('GET /api/v1/favorites', () => {
  beforeEach(async () => {
    await Favs.deleteMany({});
    await User.deleteMany({});

    const user = {
      name: 'Jhon',
      lastName: 'Doe',
      email: 'jhon.doe@gmail.com',
      country: 'Chile',
      password: 'aleman234',
      passwordConfirm: 'aleman234',
    };

    await api
      .post('/api/v1/auth/register')
      .send(user);

    const userSaved = await User.findOne({ email: 'jhon.doe@gmail.com' });

    const newFav = {
      placeInfo:
      {
        name: 'Rinconcito Arequipeno',
        latitude: -11.989527,
        longitude: -77.064804,
        num_reviews: 7,
        location: 'Lima, Lima Region',
        images: {
          small: {
            width: 150,
            url: 'https://media-cdn.tripadvisor.com/media/photo-l/0d/da/5f/5d/entrada.jpg',
            height: 150,
          },
          thumbnail: {
            width: 50,
            url: 'https://media-cdn.tripadvisor.com/media/photo-t/0d/da/5f/5d/entrada.jpg',
            height: 50,
          },
          medium: {
            width: 250,
            url: 'https://media-cdn.tripadvisor.com/media/photo-f/0d/da/5f/5d/entrada.jpg',
            height: 188,
          },
          large: {
            width: 550,
            url: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/da/5f/5d/entrada.jpg',
            height: 413,
          },
          original: {
            width: 2048,
            url: 'https://media-cdn.tripadvisor.com/media/photo-o/0d/da/5f/5d/entrada.jpg',
            height: 1536,
          },
        },
        rating: 4.5,
        description: 'Lugar para comer rico :D',
        url: 'https://www.tripadvisor.com/Restaurant_Review-g294316-d8769355-Reviews-Rinconcito_Arequipeno-Lima_Lima_Region.html',
        website: 'https://www.facebook.com/Rinconcito-Arequipe%C3%B1o-Los-Olivos-368326646630498/',
        address: 'Alfredo Mendiola 3805, Lima Los Olivos Peru',
      },
      userId: userSaved._id,
    };

    await api
      .post('/api/v1/favorites')
      .send(newFav);
  });

  test('Should return 200 status code with all favorites', async () => {
    await api
      .get('/api/v1/favorites')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('Should return 204 status code when an favorite is deleted', async () => {
    const favToDelete = await Favs.findOne({});

    await api
      .delete(`/api/v1/favorites/${favToDelete._id}`)
      .expect(204);

    const user = await User.findOne({});

    expect(user.favorites.length).toBe(0);
  });
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
