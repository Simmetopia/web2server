import { dbModel, dbSchema } from '../schema/init';
import { Exercise, exerciseSchema } from '../exercise/exerciseSchema';
import { CollectionEnum } from '../schema/collectionEnum';
import { Document } from 'mongoose';
import { UserModel } from '../user/userSchema';


export interface Workout {
  exercises: Exercise[],
  name: string;
  createdBy: UserModel
}

export type WorkoutModelType = Workout & Document;

const workoutSchema = new dbSchema({
  exercises: { type: [exerciseSchema],  },
  name: { type: String, required: [true, 'A workout name is required'] },
  createdBy: {type: dbSchema.Types.ObjectId, ref:"UserSchema", required: [true, "Must be created by an active user"]}
});

export const WorkoutModel = dbModel<WorkoutModelType>('WorkoutSchema', workoutSchema, CollectionEnum.Workout);