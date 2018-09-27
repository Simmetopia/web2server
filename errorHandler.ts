import { of } from 'rxjs';

export const catchErrorFunction = <T>(err: any, errorObject) => {

  console.log(err, errorObject);
  return of('there was a error');
};