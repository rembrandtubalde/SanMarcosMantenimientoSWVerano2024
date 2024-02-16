import { Collection, Connection } from "mongoose";

export abstract class MongooseRepository<T> {
  constructor(private _client: Promise<Connection>) {}
  
  protected abstract collectionName(): string;

  protected client(): Promise<Connection> {
    return this._client;
  }

  protected async collection(): Promise<Collection> {
    return (await (this._client)).collection(this.collectionName());
  }

  protected async persist(id: string, entity: T): Promise<void> {
    const collection = await this.collection();

    const document = { ...entity, _id: id, id: undefined };

    await collection.updateOne({ _id: id }, { $set: document }, { upsert: true });
  }
}
