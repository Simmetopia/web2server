import { IWrite } from './IWrite';
import { IRead } from './IRead';
import { from, Observable, throwError } from 'rxjs';
import { Document, Model } from 'mongoose';
import { first } from 'rxjs/operators';

export abstract class IRepository<T extends Document, U> implements IWrite<T, U>, IRead<T, U> {
  public documentModel: Model<T>;

  protected constructor(documentModel: Model<T>) {
    this.documentModel = documentModel;
  }

  createOne(object: U): Observable<T> {
    return from(this.documentModel.create(object)).pipe(first());
  }

  deleteOne(id: string): Observable<T> {
    return from(this.documentModel.deleteOne(id).exec()).pipe(first());
  }

  findById(id: string): Observable<T> {
    return from(this.documentModel.findById(id).exec()).pipe(first());
  }

  find(conditions: Partial<Record<keyof U, string>>): Observable<T | T[]> {
    return from(this.documentModel.findOne(conditions).exec()).pipe(first());
  }

  findOne(conditions: Partial<Record<keyof U, string>>): Observable<T> {
    return from(this.documentModel.findOne(conditions).exec()).pipe(first());
  }

  findAll(): Observable<T[]> {
    return from(this.documentModel.find().exec()).pipe(first());
  }

  findOneAndUpdate(id: string, data: U): Observable<T> {
    const errors = new this.documentModel(data).validateSync();
    if (errors) {
      return throwError(errors);
    } else {
      return from(this.documentModel.findOneAndUpdate({ _id: id }, data, { new: true }).exec()).pipe(first());
    }
  }
}
