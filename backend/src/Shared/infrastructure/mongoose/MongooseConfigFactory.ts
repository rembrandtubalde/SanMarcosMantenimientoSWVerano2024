import MongooseConfig from './MongooseConfig';

export class MongooseConfigFactory {
	static createConfig(): MongooseConfig {
		return {
			url: process.env.MONGODB_URI,
		};
	}
}
