import { StringValueObject } from '../../Shared/domain/value-objects/StringValueObject';

export class UserEmail extends StringValueObject {
	constructor(value: string) {
		super(value, 'Debes ingresar un correo');
		this.ensureEmailHasValidFormat(value);
	}

	private ensureEmailHasValidFormat(value: string) {
		const regexToValidateEmails = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

		if (!regexToValidateEmails.test(value)) {
			throw new Error('Debe ingresar un correo válido');
		}
	}
}
