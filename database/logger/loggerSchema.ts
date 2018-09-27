import { dbModel, dbSchema } from '../schema/init';
import { CollectionEnum } from '../schema/collectionEnum';
import { from, Observable } from 'rxjs';
import { Document } from 'mongoose';
import { catchError, first } from 'rxjs/operators';
import { catchErrorFunction } from '../../errorHandler';

const oneDayIsMs = 86400000;

const logger = new dbSchema({
  value: Object,
  timestamp: Number
});

const LoggerSchema = dbModel(CollectionEnum.Logger, logger, CollectionEnum.Logger);

export const last24HourLogs = (): Observable<Document[] | string> => {
  const timerDifference = Date.now() - oneDayIsMs;
  return from(LoggerSchema.find().where('timestamp').gte(timerDifference).exec()).pipe(first(), catchError(catchErrorFunction));

};

export const logToDatabase = (value: object) => {
  return from(LoggerSchema.create({ value, timestamp: Date.now() })).pipe(first(), catchError(catchErrorFunction));
};