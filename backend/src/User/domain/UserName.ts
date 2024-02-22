import { InvalidArgumentError } from '../../Shared/domain/value-objects/InvalidArgumentError';
import { StringValueObject } from '../../Shared/domain/value-objects/StringValueObject';

export class UserName extends StringValueObject {
	constructor(value: string) {
		super(value, 'Debes ingresar un nombre');
		this.ensureLengthIsValid(value);
		this.ensureNameHasValidFormat(value);
	}

	private ensureLengthIsValid(value: string) {
		if (value.length < 3) {
			throw new InvalidArgumentError('El nombre debe contener más de 3 caracteres');
		}

		if (value.length > 25) {
			throw new InvalidArgumentError('El nombre debe tener menos de 25 caracteres');
		}
	}

	private ensureNameHasValidFormat(value: string) {
		const regex = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/;

		if (!regex.test) {
			throw new InvalidArgumentError('Debe ingresar un nombre válido');
		}
	}
}
