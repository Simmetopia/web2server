import mongoose, { ConnectionOptions, Document, Schema } from 'mongoose';
import { getMongoConnectionOptions } from '../../utils/configHelper';
import { CollectionEnum } from './collectionEnum';

const MongooseClient = mongoose;
const options: ConnectionOptions = {
  useNewUrlParser: true
};


function connectToMongo(options: ConnectionOptions): Promise<typeof mongoose> {
  const { username, password } = getMongoConnectionOptions();
  return MongooseClient.connect(`mongodb://${username}:${password}@ds163162.mlab.com:63162/heroku_hb11wrv8`, options);
}

MongooseClient.set('useCreateIndex', true);

async function initializeDatabase(): Promise<void> {
  try {
    const connected = await connectToMongo(options);
    console.log('Successfully connected to database: ', connected.connection.db.databaseName);
  } catch (e) {
    console.log('there was an error:', e);
    throw e;
  }
}

initializeDatabase();
// if any errors, console.log them
MongooseClient.connection.on('error', console.log);

export const dbSchema = MongooseClient.Schema;
export const dbModel = <T extends Document>(name: string, schema: Schema, collection: CollectionEnum) => MongooseClient.model<T>(name, schema, collection);
export const dbConnection = MongooseClient.connection;

