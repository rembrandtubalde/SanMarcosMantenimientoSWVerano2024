import { NumberValueObject } from '../../Shared/domain/value-objects/NumberValueObject';
import { StringValueObject } from '../../Shared/domain/value-objects/StringValueObject';

export class DateBudget {
	readonly description: DateBudgetDescription;
	readonly balance: DateBudgetBalance;

	constructor(description: DateBudgetDescription, balance: DateBudgetBalance) {
		this.description = description;
		this.balance = balance;
	}

	static fromPrimitives(plainData: { description: string; balance: number }) {
		return new DateBudget(new DateBudgetDescription(plainData.description), new DateBudgetBalance(plainData.balance));
	}
}

export class DateBudgetDescription extends StringValueObject {
	constructor(value: string) {
		super(value, 'Debes agregar una descripción');
	}
}

export class DateBudgetBalance extends NumberValueObject {
	constructor(value: number) {
		super(value, 'Debes agregar un monto');
	}
}
