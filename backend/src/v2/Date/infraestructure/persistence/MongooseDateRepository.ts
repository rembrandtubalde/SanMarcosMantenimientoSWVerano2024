import { Nullable } from '../../../Shared/domain/value-objects/Nullable';
import { MongooseRepository } from '../../../Shared/infrastructure/mongoose/MongooseRepository';
import { DateEntity } from '../../domain/Date';
import { DateBudget } from '../../domain/DateBudget';
import { DateExpectedDate } from '../../domain/DateExpectedDate';
import { DateRepository } from '../../domain/date.repository';

export interface DateDocument {
	_id: string;
	userId: string;
	category: string;
	budget: { description: string; balance: number }[];
	expectedDate: { day: string; hour: string };
	placeId: string;
}

export class MongooseDateRepository extends MongooseRepository<DateEntity> implements DateRepository {
	protected collectionName(): string {
		return 'dates';
	}

	public save(date: DateEntity): Promise<void> {
		return this.persist(date.id.value, date);
	}

	public async findByUser(userId: string): Promise<DateEntity[]> {
		const collection = await this.collection();
		const documents = await collection.find<DateDocument>({ userId }, {}).toArray();
		console.log(documents);

		return documents.map((document) => {
			const date = DateEntity.fromPrimitives({
				id: document._id,
				userId: document.userId,
				category: document.category,
				expectedDate: {
					day: document.expectedDate.day,
					hour: document.expectedDate.hour,
				},
				placeId: document.placeId,
			});

			date.setBudget(
				document.budget.map((item) =>
					DateBudget.fromPrimitives({ description: item.description, balance: item.balance }),
				),
			);

			return date.toPrimitives();
		});
	}

	public async remove(dateId: string): Promise<void> {
		const collection = await this.collection();
		await collection.deleteOne({ _id: dateId });
	}

	public async find(dateId: string): Promise<Nullable<DateEntity>> {
		const collection = await this.collection();
		const document = await collection.findOne<DateDocument>({ _id: dateId }, {});

		if (document) {
			const date = DateEntity.fromPrimitives({
				id: document._id,
				userId: document.userId,
				category: document.category,
				expectedDate: {
					day: document.expectedDate.day,
					hour: document.expectedDate.hour,
				},
				placeId: document.placeId,
			});

			date.setBudget(
				document.budget.map((item) =>
					DateBudget.fromPrimitives({ description: item.description, balance: item.balance }),
				),
			);

			return date.toPrimitives();
		}

		return null;
	}
}
