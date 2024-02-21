import { Request, Response } from "express";
import { Controller } from "./Controller";
import { createUserUseCase } from '../../Shared/infrastructure/dependencies';
import { Uuid } from "../../Shared/domain/value-objects/Uuid";

type UserPutRequest = Request & {
  body: {
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
      const { name, lastName, email, password, passwordConfirm, country, avatar } = req.body;
      
      await createUserUseCase.execute({
        id: Uuid.random().value,
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