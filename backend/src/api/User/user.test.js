import supertest from 'supertest';
import mongoose from 'mongoose';

import User from './user';
import { Server } from '../../app';

const server = new Server(3001);
server.listen();

const api = supertest(server.getExpress());

describe('Sanity test', () => {
	test('Endpoint /ping should return "pong!"', async () => {
		const response = await api.get('/ping');

		expect(response.status).toEqual(200);
		expect(response.text).toEqual('pong!');
	});
});

describe('POST /api/v2/auth/register', () => {
	beforeEach(async () => {
		await User.deleteMany({});
	});

	test('Should return 201 status code', async () => {
		const user = {
			name: 'Jhon',
			lastName: 'Doe',
			email: 'jhon.doe@gmail.com',
			country: 'Chile',
			password: 'aleman234',
			passwordConfirm: 'aleman234',
		};

		await api.post('/api/v2/auth/register').send(user).expect(201).expect('Content-Type', /json/);
	});

	test('Should return an error if passwords doesn´t match', async () => {
		const user = {
			name: 'Jhon',
			lastName: 'Doe',
			email: 'jhon.doe@gmail.com',
			country: 'Chile',
			password: 'aleman234',
			passwordConfirm: 'notMatchPassword',
		};

		const res = await api.post('/api/v2/auth/register').send(user);

		expect(res.status).toEqual(500);
		expect(res.error.text).toContain('Las contraseñas no coinciden');
	});
});

afterAll((done) => {
	mongoose.connection.close();
	done();
});
