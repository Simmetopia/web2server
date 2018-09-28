import { Observable } from 'rxjs';

export interface IRead<T, U> {
  findById(id: string): Observable<T>

  find(conditions: Partial<Record<keyof U, string>>): Observable<T | T[]>

  findOne(conditions: Partial<Record<keyof U, string>>): Observable<T>
}