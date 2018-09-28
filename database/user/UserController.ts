import { Request, Response, Router } from 'express';
import { compareSync, hashSync } from 'bcrypt';
import { UserRepository } from '../../repository/UserRepository';

interface EmailAndPassword {
  email: string;
  password: string;
}

export class UserController {

  private index = async (request: Request, response: Response) => {
    this.users.findAll().subscribe(val => {
      response.status(200).json(val);
    });
  };

  private createUser = async (request: Request, response: Response) => {
    const { password, email } = request.body as EmailAndPassword;
    this.users.createOne({ email: email, password: hashSync(password, 12) })
      .subscribe(
        val => response.status(200).send(val),
        error => response.status(400).send(error)
      )
    ;

  };

  private login = async (request: Request, response: Response) => {
    const { email, password } = request.body as EmailAndPassword;
    this.users.findOne({ email }).subscribe(
      (user) => {
        if (user && compareSync(password, user.password)) {
          response.status(200).send(user);
        } else {
          response.status(400).send('unknown user or password');
        }
      }
    );

  };

  constructor(private router: Router, private users: UserRepository) {
    this.initRoutes();
  }

  public get Router() {
    return this.router;
  }

  private initRoutes() {
    this.router.get('', this.index);
    this.router.post('/create', this.createUser);
    this.router.post('/login', this.login);
  }
}
