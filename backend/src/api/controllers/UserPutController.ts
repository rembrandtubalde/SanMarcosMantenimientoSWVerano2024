import { Request, Response } from "express";
import { Controller } from "./Controller";
import { createUserUseCase } from '../../Shared/infrastructure/dependencies';

type UserPutRequest = Request & {
  body: {
    id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
    country: string;
    avatar: string;
  }
}

export class UserPutController implements Controller {
  async run(req: UserPutRequest, res: Response) {
    try {
      const { id, name, lastName, email, password, passwordConfirm, country, avatar } = req.body;
      
      await createUserUseCase.execute({
        id,
        name,
        lastName,
        email,
        password,
        passwordConfirm,
        country,
        avatar
      })

      res.status(201).send();
    } catch (error) {
      res.status(500).send();
    }
  }
}