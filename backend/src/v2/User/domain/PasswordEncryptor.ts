export interface PasswordEncryptor {
	encrypt(value: string): Promise<string>;
	compare(value: string, valueToCompare: string): Promise<boolean>;
}
