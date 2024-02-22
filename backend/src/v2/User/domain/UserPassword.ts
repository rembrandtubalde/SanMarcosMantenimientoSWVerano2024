import { InvalidArgumentError } from '../../Shared/domain/value-objects/InvalidArgumentError';
import { StringValueObject } from '../../Shared/domain/value-objects/StringValueObject';

export class UserPassword extends StringValueObject {
	constructor(value: string) {
		super(value, 'Debes ingresar una contraseña');
		this.ensurePasswordHasValidLength(value);
	}

	private ensurePasswordHasValidLength(value: string) {
		if (value.length < 8) {
			throw new InvalidArgumentError('La contraseña debe tener entre 8 y 16 caracteres');
		}

		if (value.length > 16) {
			throw new InvalidArgumentError('La contraseña no debe tener más de 16 caracteres');
		}
	}
}
