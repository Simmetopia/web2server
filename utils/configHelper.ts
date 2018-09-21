import { config } from 'dotenv';

config();

interface MongoConnectionOptions {
  password: string;
  username: string;
}

export const getMongoConnectionOptions = (): MongoConnectionOptions => {
  return {
    password: process.env.dbPW,
    username: process.env.dbUNAME
  };
};