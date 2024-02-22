import { createConnection, Connection } from 'mongoose';
import MongooseConfig from './MongooseConfig';

export class MongoClientFactory {
	static async createClient(config: MongooseConfig): Promise<Connection> {
		try {
			const connection = await createConnection(config.url).asPromise();

			console.log('MongoDB is connected successfully');
			return connection;
		} catch (e) {
			console.log(e);
			throw new Error('Error ocurred connecting to DB');
		}
	}
}
