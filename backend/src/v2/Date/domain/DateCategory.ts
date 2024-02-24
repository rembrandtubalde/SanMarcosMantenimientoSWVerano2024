import { InvalidArgumentError } from '../../Shared/domain/value-objects/InvalidArgumentError';
import { StringValueObject } from '../../Shared/domain/value-objects/StringValueObject';

export class DateCategory extends StringValueObject {
	constructor(value: string) {
		super(value, 'Elija una categoría por favor');
		this.ensureIsValidCategory(value);
	}

	private ensureIsValidCategory(value: string) {
		const allowedCategoies = ['familia', 'pareja', 'amigos'];

		if (!allowedCategoies.includes(value)) {
			throw new InvalidArgumentError('La categoría no es válida');
		}
	}
}
