import { InvalidArgumentError } from '../../Shared/domain/value-objects/InvalidArgumentError';
import { OptionalStringValueObject } from '../../Shared/domain/value-objects/StringValueObject';

export class UserLastName extends OptionalStringValueObject {
	constructor(value: string) {
		super(value);
		this.ensureLengthIsValid(value);
		this.ensureLastNameHasValidFormat(value);
	}

	private ensureLengthIsValid(value: string) {
		if (value.length < 3) {
			throw new InvalidArgumentError('El apellido debe contener más de 3 caracteres');
		}

		if (value.length > 25) {
			throw new InvalidArgumentError('El apellido debe tener menos de 25 caracteres');
		}
	}

	private ensureLastNameHasValidFormat(value: string) {
		const regex = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/;

		if (!regex.test(value)) {
			throw new InvalidArgumentError('Debe ingresar un apellido válido');
		}
	}
}
