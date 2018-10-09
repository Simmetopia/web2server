import { Request, Response, Router } from 'express';
import { compareSync, hashSync } from 'bcrypt';
import { UserRepository } from '../../repository/UserRepository';
import { authenticate } from '../../authentication';
import { callbackify } from 'util';
import { sign } from 'jsonwebtoken';
import { getSecret } from '../../utils/configHelper';

interface EmailAndPassword {
  email: string;
  password: string;
}

export class UserController {

  private index = async (request: Request, response: Response) => {
    this.users.findAll().subscribe(val => {
      response.status(200).json(val);
    }, error => response.status(400).send(error));
  };

  private createUser = async (request: Request, response: Response) => {
    const { password, email } = request.body as EmailAndPassword;
    this.users.createOne({ email: email, password: hashSync(password, 12) })
      .subscribe(
        val => {
          const dataToSend = {
            data: val,
            token: sign(val, getSecret())
          }
          response.status(200).json(dataToSend)
        },
        error => response.status(400).send(error)
      )
      ;

  };

  private login = async (request: Request, response: Response) => {
    const { email, password } = request.body as EmailAndPassword;
    this.users.findOne({ email }).subscribe(
      (user) => {
        if (user && compareSync(password, user.password)) {
          const dataToSend = {
            data: user,
            token: sign({ id: user.id }, getSecret())
          }
          response.status(200).json(dataToSend);
        } else {
          response.status(400).send('unknown user or password');
        }
      }, error => response.status(400).send(error)
    );

  };

  constructor(private router: Router, private users: UserRepository) {
    this.initRoutes();
  }

  public get Router() {
    return this.router;
  }

  private initRoutes() {
    this.router.get('', authenticate, this.index);
    this.router.post('/create', this.createUser);
    this.router.post('/login', this.login);
  }
}
