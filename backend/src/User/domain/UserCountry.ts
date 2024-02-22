import { StringValueObject } from '../../Shared/domain/value-objects/StringValueObject';

export class UserCountry extends StringValueObject {
	constructor(value: string) {
		super(value);
	}
}
