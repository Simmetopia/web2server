import { dbModel, dbSchema } from '../schema/init';
import { CollectionEnum } from '../schema/collectionEnum';

const oneDayIsMs = 86400000;

const logger = new dbSchema({
  value: String,
  timestamp: Number
});

const LoggerSchema = dbModel(CollectionEnum.Logger, logger, CollectionEnum.Logger);

export const last24HourLogs = () => {
  const timerDifference = Date.now() - oneDayIsMs;
  return LoggerSchema.find().where('timestamp').gte(timerDifference).exec();
};

export const logToDatabase = async (value: string) => {
  LoggerSchema.create({ value, timestamp: Date.now() });
};