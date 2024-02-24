import { Request, Response } from 'express';

export interface Controller {
	run(req: Request, res: Response, next: Function): Promise<void>;
}
