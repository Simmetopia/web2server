import { Application, NextFunction, Request, Response, Router } from 'express';
import { UserController } from './database/user/UserController';
import { WorkoutController } from './database/workout/workoutController';
import * as bodyParser from 'body-parser';
import { last24HourLogs, logToDatabase } from './database/logger/loggerSchema';
import { UserRepository } from './repository/UserRepository';
import { UserModel } from './database/user/userSchema';
import { WorkoutModel } from './database/workout/workoutSchema';
import { WorkoutRepository } from './repository/WorkoutRepository';
import { html } from './apiDocumentation';
import cors = require('cors');
import { authenticate } from './authentication';

export class RootApplication {

  private index = (request: Request, response: Response) => {
    response.status(200).send(html);
  };

  private logs = async (request: Request, response: Response) => {
    last24HourLogs().subscribe((val) => {
      response.status(200).send(val);
    });
  };
  private loggerFunction = (req: Request, _: any, next: NextFunction) => {
    logToDatabase({
      headers: req.headers,
      body: req.body,
      params: req.params,
      reqUrl: req.url
    }).subscribe(console.log);
    next();

  };

  constructor(private router: Router, private application: Application) {
    this.initRoutes();
    this.initMiddleware();
  }

  public get Router() {
    return this.router;
  }

  private initMiddleware() {
    this.application.use(cors());
    this.application.use(bodyParser.json());
    this.application.use(bodyParser.urlencoded({ extended: false }));
  }

  private initRoutes() {
    this.router.use('*', this.loggerFunction);
    this.router.get('', this.index);
    this.router.get('/logs', authenticate, this.logs);
    this.router.use('/api/v1/users', new UserController(Router(), new UserRepository(UserModel)).Router);
    this.router.use('/api/v1/workouts', [new WorkoutController(Router(), new WorkoutRepository(WorkoutModel)).Router]);
  }
}
