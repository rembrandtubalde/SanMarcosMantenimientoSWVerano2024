import { Nullable } from '../../Shared/domain/value-objects/Nullable';
import { DateEntity } from './Date';

export interface DateRepository {
	save(date: DateEntity): Promise<any>;
	find(dateId: string): Promise<Nullable<DateEntity>>;
	findByUser(userId: string): Promise<DateEntity[]>;
	remove(dateId: string): Promise<void>;
}
