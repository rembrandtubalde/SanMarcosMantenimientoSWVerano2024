import bcrypt from 'bcrypt';
import { PasswordEncryptor } from '../domain/PasswordEncryptor';

export class BcryptPasswordEncryptor implements PasswordEncryptor {
	private readonly SALT_ROUNDS = 10;

	async compare(value: string, valueToCompare: string): Promise<boolean> {
		return await bcrypt.compare(value, valueToCompare);
	}

	async encrypt(value: string): Promise<string> {
		return await bcrypt.hash(value, this.SALT_ROUNDS);
	}
}
