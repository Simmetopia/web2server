import { Request, Response, Router } from 'express';
import { Workout } from './workoutSchema';
import { WorkoutRepository } from '../../repository/WorkoutRepository';
import { authenticate } from '../../authentication';


export class WorkoutController {

  private index = async (request: Request, response: Response) => {
    this.workouts.find({}).subscribe(val => response.status(200).json(val), error => response.status(400).send(error));
  };

  private createWorkout = async (request: Request, response: Response) => {
    this.workouts.createOne(request.body as Workout).subscribe(
      val => response.status(200).json(val),
      error => response.status(400).send(error)
    );
  };

  private findWorkoutById = async (request: Request, response: Response) => {
    this.workouts.findById(request.params.id).subscribe(
      workout => response.status(200).send(workout),
      error => response.status(400).send(error)
    );
  };


  private findWorkoutByIdAndUpdate = async (request: Request, response: Response) => {
    const dataToUpdate = request.body as Workout;

    this.workouts.findOneAndUpdate(request.params.id, dataToUpdate).subscribe(
      workout => response.status(200).send(workout),
      error => response.status(400).send(error)
    );
  };

  private findWorkoutByIdAndDelete = async (request: Request, response: Response) => {
    this.workouts.deleteOne(request.params.id).subscribe(
      val => response.status(200).json(val),
      error => response.status(400).send(error)
    );
  };

  constructor(private router: Router, private workouts: WorkoutRepository) {
    this.initRoutes();
  }

  public get Router() {
    return this.router;
  }

  private initRoutes() {
    this.router.get('', this.index);
    this.router.post('', authenticate, this.createWorkout);
    this.router.get('/:id', authenticate, this.findWorkoutById);
    this.router.put('/:id', authenticate, this.findWorkoutByIdAndUpdate);
    this.router.delete('/:id', authenticate, this.findWorkoutByIdAndDelete);
  }
}
