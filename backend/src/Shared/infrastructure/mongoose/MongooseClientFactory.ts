import { connect } from 'mongoose';
import MongooseConfig from "./MongooseConfig";

export class MongoClientFactory {
  static async createClient(config: MongooseConfig): Promise<typeof import("mongoose")> {
    try {
      const connection = await connect(config.url);

      return connection;
    } catch (e) {
      throw new Error("Error ocurred connecting to DB");
    }
  }

}