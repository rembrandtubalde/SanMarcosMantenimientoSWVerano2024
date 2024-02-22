import { BaseEntity } from '../../Shared/domain/BaseEntity';
import { UserAvatar } from './UserAvatar';
import { UserCountry } from './UserCountry';
import { UserEmail } from './UserEmail';
import { UserId } from './UserId';
import { UserLastName } from './UserLastName';
import { UserName } from './UserName';
import { UserPassword } from './UserPassword';

export class User extends BaseEntity {
	readonly id: UserId;
	readonly name: UserName;
	readonly lastName: UserLastName;
	readonly email: UserEmail;
	readonly password: UserPassword;
	readonly country: UserCountry;
	readonly avatar: UserAvatar;
	readonly hashedPassword: string;

	constructor(
		id: UserId,
		name: UserName,
		lastName: UserLastName,
		email: UserEmail,
		password: UserPassword,
		country: UserCountry,
		avatar: UserAvatar,
		hashedPassword: string,
	) {
		super();
		this.id = id;
		this.name = name;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.country = country;
		this.avatar = avatar;
		this.hashedPassword = hashedPassword;
	}

	static create(
		id: UserId,
		name: UserName,
		lastName: UserLastName,
		email: UserEmail,
		password: UserPassword,
		country: UserCountry,
		avatar: UserAvatar,
		hashedPassword: string,
	): User {
		const user = new User(id, name, lastName, email, password, country, avatar, hashedPassword);

		return user;
	}

	static fromPrimitives(plainData: {
		id: string;
		name: string;
		lastName: string;
		email: string;
		password: string;
		country: string;
		avatar: string;
		hashedPassword: string;
	}): User {
		return new User(
			new UserId(plainData.id),
			new UserName(plainData.name),
			new UserLastName(plainData.lastName),
			new UserEmail(plainData.email),
			new UserPassword(plainData.password),
			new UserCountry(plainData.country),
			new UserAvatar(plainData.avatar),
			plainData.hashedPassword,
		);
	}

	toPrimitives(): any {
		return {
			id: this.id.value,
			name: this.name.value,
			lastName: this.lastName.value,
			email: this.email.value,
			country: this.country.value,
			avatar: this.avatar.value,
			password: this.hashedPassword,
		};
	}
}
