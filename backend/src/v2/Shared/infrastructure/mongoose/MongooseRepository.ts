import { Collection, Connection } from 'mongoose';
import { BaseEntity } from '../../domain/BaseEntity';

export abstract class MongooseRepository<T extends BaseEntity> {
	constructor(private _client: Promise<Connection>) {}

	protected abstract collectionName(): string;

	protected client(): Promise<Connection> {
		return this._client;
	}

	protected async collection(): Promise<Collection> {
		return (await this._client).collection(this.collectionName());
	}

	protected async persist(id: string, entity: T): Promise<void> {
		const collection = await this.collection();

		const document = { ...entity.toPrimitives(), _id: id, id: undefined };

		await collection.updateOne({ _id: id }, { $set: document }, { upsert: true });
	}

	protected async delete(id: string): Promise<void> {
		const collection = await this.collection();

		await collection.deleteOne({ _id: id });
	}
}
