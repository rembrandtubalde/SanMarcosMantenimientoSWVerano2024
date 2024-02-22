type EnvironmentVariables = {
	PORT?: number;
	MONGODB_URI: string;
	SECRET: string;
	GOOGLE_API_KEY: string;
};

declare namespace NodeJS {
	interface Process {
		env: EnvironmentVariables;
	}
}
