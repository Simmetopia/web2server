import { dbModel, dbSchema } from '../schema/init';
import { CollectionEnum } from '../schema/collectionEnum';
import { Document } from 'mongoose';


export interface Exercise {
  description:string;
  repetitions: number;
  name: string;
}

type ExerciseModel = Document & Exercise;

export const exerciseSchema = new dbSchema({
  description: { type: String, required: [true, "you must have a description of the exercise"] },
  repetitions: { type: Number, required: [true, "Repititions is needed for the exercise"], min: 1 },
  name: { type: String, required: [true, "name must be specified"] }
});

export const ExerciseModel = dbModel<ExerciseModel>('ExerciseModel', exerciseSchema, CollectionEnum.Exercise);