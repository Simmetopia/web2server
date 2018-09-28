import { IRepository } from './IRepository';
import { User, UserModel } from '../database/user/userSchema';
import { Model } from 'mongoose';

export class UserRepository extends IRepository<UserModel, User> {

  constructor(documentModel: Model<UserModel>) {
    super(documentModel);
  }
}