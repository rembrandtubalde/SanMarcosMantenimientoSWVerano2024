import { InvalidArgumentError } from './InvalidArgumentError';

export type Primitives = String | string | number | Boolean | boolean | Date;

export abstract class ValueObject<T extends Primitives> {
	readonly value: T;
	readonly errorMessage: string;

	constructor(value: T, errorMessageIfIsNotDefined: string) {
		this.value = value;
		this.errorMessage = errorMessageIfIsNotDefined;
		this.ensureValueIsDefined(value);
	}

	private ensureValueIsDefined(value: T): void {
		if (value === null || value === undefined) {
			throw new InvalidArgumentError(this.errorMessage);
		}
	}

	equals(other: ValueObject<T>): boolean {
		return other.constructor.name === this.constructor.name && other.value === this.value;
	}

	toString(): string {
		return this.value.toString();
	}
}

export abstract class OptionalValueObject<T extends Primitives> {
	readonly value: T;

	constructor(value: T) {
		this.value = value;
	}

	equals(other: ValueObject<T>): boolean {
		return other.constructor.name === this.constructor.name && other.value === this.value;
	}

	toString(): string {
		return this.value.toString();
	}
}
