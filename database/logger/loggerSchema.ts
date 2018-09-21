import { dbModel, dbSchema } from '../schema/init';
import { CollectionEnum } from '../schema/collectionEnum';

const oneDayIsMs = 86400000;

const logger = new dbSchema({
  value: String,
  timestamp: Date
});

const LoggerSchema = dbModel(CollectionEnum.Logger, logger, CollectionEnum.Logger);

export const last24HourLogs = () => {
  return LoggerSchema.find().where('date').gte(Date.now() - oneDayIsMs).exec();
};

export const logToDatabase = (value: string) => {
  LoggerSchema.create({ value, date: Date.now() });
};