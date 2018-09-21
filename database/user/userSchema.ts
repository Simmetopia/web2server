import { dbModel, dbSchema } from '../schema/init';
import { Document } from 'mongoose';
import { CollectionEnum } from '../schema/collectionEnum';

export interface User {
  email: string;
  password: string;
}

export type UserModel = Document & User


const UserSchema = new dbSchema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

export const UserModel = dbModel<UserModel>('UserSchema', UserSchema, CollectionEnum.Users);
