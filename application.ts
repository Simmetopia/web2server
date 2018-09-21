import { Application, Request, Response, Router } from 'express';
import { UserController } from './database/user/UserController';
import { WorkoutController } from './database/workout/workoutController';
import * as bodyParser from 'body-parser';
import { last24HourLogs } from './database/logger/loggerSchema';

export class RootApplication {

  private index = (request: Request, response: Response) => {
    response.status(200).send('Api route works');
  };

  private logs = async (request: Request, response: Response) => {
    const logs = last24HourLogs();
    response.status(200).send(logs);
  };

  constructor(private router: Router, private application: Application) {
    this.initRoutes();
    this.initMiddleware();
  }

  public get Router() {
    return this.router;
  }

  private initMiddleware() {
    this.application.use(bodyParser.json());
    this.application.use(bodyParser.urlencoded({ extended: false }));
  }

  private initRoutes() {
    this.router.get('', this.index);
    this.router.get('/logs', this.logs);
    this.router.use('/api/v1/users', new UserController(Router()).Router);
    this.router.use('/api/v1/workouts', new WorkoutController(Router()).Router);
  }
}
