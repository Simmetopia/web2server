import { config } from 'dotenv';

config();

interface MongoConnectionOptions {
  password: string;
  username: string;
}

type JsonWebTokenSecret = string;

export const getMongoConnectionOptions = (): MongoConnectionOptions => {
  return {
    password: process.env.dbPW,
    username: process.env.dbUNAME,
  };
};

export const getSecret = (): JsonWebTokenSecret => process.env.secret