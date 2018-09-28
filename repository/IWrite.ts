import { Observable } from 'rxjs';

export interface IWrite<T, U> {
  findOneAndUpdate(id: string, data: U): Observable<T>;

  createOne(object: U): Observable<T>

  deleteOne(id: string): Observable<T>
}