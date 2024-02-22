import { Request, Response } from "express";
import { Controller } from "./Controller";
import { createUserUseCase } from '../../Shared/infrastructure/dependencies';
import { Uuid } from "../../Shared/domain/value-objects/Uuid";
import httpStatus from "http-status";

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
  async run(req: UserPutRequest, res: Response, next: Function) {
    try {
      const { name, lastName, email, password, passwordConfirm, country, avatar } = req.body;
      
      const newUser = {
        id: Uuid.random().value,
        name,
        lastName,
        email,
        password,
        passwordConfirm,
        country,
        avatar
      }

      const userSaved = await createUserUseCase.execute({ ...newUser });
      delete userSaved.password;
    
      res.status(httpStatus.CREATED).send({
        status: 'success',
        user: userSaved,
      });
    } catch (error) {
      next(error);
    }
  }
}