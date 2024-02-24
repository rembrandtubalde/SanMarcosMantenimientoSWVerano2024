import { DateEntity } from '../domain/Date';
import { DateBudget } from '../domain/DateBudget';
import { DateExpectedDate } from '../domain/DateExpectedDate';
import { DateId } from '../domain/DateId';
import { DateRepository } from '../domain/date.repository';

export interface IDateEntityData {
	id: string;
	userId: string;
	category: string;
	budget: { description: string; balance: number }[];
	expectedDate: { day: string; hour: string };
	placeId: string;
}

export class SaveDate {
	constructor(private repository: DateRepository) {}

	async execute(props: IDateEntityData): Promise<any> {
		const date = DateEntity.fromPrimitives({
			id: props.id,
			userId: props.userId,
			category: props.category,
			expectedDate: {
				day: props.expectedDate.day,
				hour: props.expectedDate.hour,
			},
			placeId: props.placeId,
		});

		date.setBudget(
			props.budget.map((item) => DateBudget.fromPrimitives({ description: item.description, balance: item.balance })),
		);
		await this.repository.save(date);

		return date.toPrimitives();
	}
}
