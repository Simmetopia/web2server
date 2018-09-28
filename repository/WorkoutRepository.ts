import { IRepository } from './IRepository';
import { Workout, WorkoutModelType } from '../database/workout/workoutSchema';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

export class WorkoutRepository extends IRepository<WorkoutModelType, Workout> {

  constructor(documentModel: Model<WorkoutModelType>) {
    super(documentModel);
  }


  find(conditions: Partial<Record<keyof Workout, string>>): Observable<WorkoutModelType | WorkoutModelType[]> {
    return from(this.documentModel.find().populate('createdBy', 'email').exec()).pipe(first());
  }
}