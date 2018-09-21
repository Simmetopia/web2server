import { Router } from 'express';

declare interface RouteHandler {
  Router: Router;
  initRoutes();
}
