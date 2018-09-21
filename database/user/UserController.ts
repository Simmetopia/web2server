import { Request, Response, Router } from 'express';
import { UserModel } from './userSchema';
import { compareSync, hashSync } from 'bcrypt';

interface EmailAndPassword {
  email: string;
  password: string;
}

export class UserController {

  private index = async (request: Request, response: Response) => {
    const users = await UserModel.find();
    response.json(users);
  };

  private createUser = async (request: Request, response: Response) => {
    const { password, email } = request.body as EmailAndPassword;
    try {
      const user = await UserModel.create({ email: email, password: hashSync(password, 12) });
      response.status(200).send(user);

    } catch (e) {
      response.status(400).send(e);
    }
  };

  private login = async (request: Request, response: Response) => {
    const { email, password } = request.body as EmailAndPassword;
    const user = await UserModel.findOne({ email });
    if (user && compareSync(password, user.password)) {
      response.status(200).send(user);
    } else {
      response.status(400).send('unknown user or password');
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
    this.router.post('/create', this.createUser);
    this.router.post('/login', this.login);
  }
}
