type EnvironmentVariables = {
	PORT?: number;
	NODE_ENV: string;
	MONGODB_TEST_URI: string;
	MONGODB_URI: string;
	SECRET: string;
	GOOGLE_API_KEY: string;
};

declare namespace NodeJS {
	interface Process {
		env: EnvironmentVariables;
	}
}
