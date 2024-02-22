import MongooseConfig from './MongooseConfig';

export class MongooseConfigFactory {
	static createConfig(): MongooseConfig {
		return {
			url: process.env.NODE_ENV === 'test' ? process.env.MONGODB_TEST_URI : process.env.MONGODB_URI,
		};
	}
}
