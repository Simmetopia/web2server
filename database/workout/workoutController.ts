import { Request, Response, Router } from 'express';
import { Workout, WorkoutModel } from './workoutSchema';


export class WorkoutController {

  private index = async (request: Request, response: Response) => {
    const workouts = await WorkoutModel
      .find()
      .populate('createdBy', 'email')
      .exec();
    response.json(workouts);
  };

  private createWorkout = async (request: Request, response: Response) => {
    try {
      const workOutData = request.body as Workout;
      const workout = await WorkoutModel.create(workOutData);
      response.status(201).send(workout);
    } catch (e) {
      response.status(400).send('Something has happened ' + e);
    }
  };

  private findWorkoutByName = async (request: Request, response: Response) => {
    try {
      const workout = WorkoutModel.find({ name: request.params.name }).populate('createdBy').exec();
      if (!workout) {
        response.status(200).send('found no workouts with given name');
      } else {
        response.status(200).send(workout);
      }
    } catch (e) {
      response.status(400).send(e);
    }
  };

  private findWorkoutByIdAndUpdate = async (request: Request, response: Response) => {
    const dataToUpdate = request.body as Workout;
    try {
      // create a new workout
      const updatedWorkout = new WorkoutModel(dataToUpdate);

      // validate that the new workout is true to the model
      const errors = updatedWorkout.validateSync();
      if (errors) {
        response.status(400).send(errors);
        return;
      }

      // find and update in the database
      const workoutToUpdate = await WorkoutModel.findOneAndUpdate({ _id: request.params.id }, updatedWorkout);
      response.status(200).send(workoutToUpdate);

    } catch (e) {
      response.status(400).send(e);
    }
  };

  private findWorkoutByIdAndDelete = async (request: Request, response: Response) => {
    try {
      const updatedWorkout = await WorkoutModel.findOneAndRemove({ _id: request.params.id });
      if (!updatedWorkout) {
        response.status(200).send('found no data to delete');
      } else {
        response.status(200).send(updatedWorkout);
      }
    } catch (e) {
      response.status(400).send(e);
    }
  };

  constructor(private router: Router) {
    this.initRoutes();
  }

  public get Router() {
    return this.router;
  }

  private initRoutes() {
    this.router.get('', this.index);
    this.router.post('', this.createWorkout);
    this.router.get('/:name', this.findWorkoutByName);
    this.router.put('/:id', this.findWorkoutByIdAndUpdate);
    this.router.delete('/:id', this.findWorkoutByIdAndDelete);
  }
}
