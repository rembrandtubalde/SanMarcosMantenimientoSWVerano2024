import { BaseEntity } from '../../Shared/domain/BaseEntity';
import { DateBudget } from './DateBudget';
import { DateCategory } from './DateCategory';
import { DateExpectedDate } from './DateExpectedDate';
import { DateId } from './DateId';

export class DateEntity extends BaseEntity {
	readonly id: DateId;
	readonly userId: string;
	readonly category: DateCategory;
	budget: DateBudget[];
	readonly expectedDate: DateExpectedDate;
	readonly placeId: string;

	constructor(id: DateId, userId: string, category: DateCategory, placeId: string, expectedDate: DateExpectedDate) {
		super();
		this.id = id;
		this.userId = userId;
		this.category = category;
		this.placeId = placeId;
		this.expectedDate = expectedDate;
	}

	static create(id: DateId, userId: string, category: string, expectedDate: DateExpectedDate, placeId: string) {
		return new DateEntity(id, userId, new DateCategory(category), placeId, expectedDate);
	}

	static fromPrimitives(plainData: {
		id: string;
		userId: string;
		category: string;
		expectedDate: { day: string; hour: string };
		placeId: string;
	}): DateEntity {
		return new DateEntity(
			new DateId(plainData.id),
			plainData.userId,
			new DateCategory(plainData.category),
			plainData.placeId,
			new DateExpectedDate(plainData.expectedDate.day, plainData.expectedDate.hour),
		);
	}

	setBudget(budget: DateBudget[]) {
		this.budget = budget.map((item) =>
			DateBudget.fromPrimitives({ description: item.description.value, balance: item.balance.value }),
		);
	}

	calculateTotalBalance(): number {
		return this.budget.reduce((total, budget) => (total += budget.balance.value), 0);
	}

	getFullExpectedDateFormatted(): string {
		return `${this.expectedDate.day} ${this.expectedDate.hour}`;
	}

	toPrimitives(): any {
		return {
			id: this.id.value,
			userId: this.userId,
			category: this.category.value,
			budget: this.budget.map((item) => ({ description: item.description.value, balance: item.balance.value })),
			expectedDate: {
				day: this.expectedDate.day,
				hour: this.expectedDate.hour,
			},
			placeId: this.placeId,
			total_balance: this.calculateTotalBalance(),
			full_expected_date: this.getFullExpectedDateFormatted(),
		};
	}
}
