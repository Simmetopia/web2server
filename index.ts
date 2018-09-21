import express from 'express';
import { RootApplication } from './application';
import { logToDatabase } from './database/logger/loggerSchema';


const app = express();

// logs all requests to the database
app.use('', (req, res, next) => {
  logToDatabase(JSON.stringify(req));
  next();
});
const rootApplication = new RootApplication(express.Router(), app);
app.use('', rootApplication.Router);

const port = process.env.PORT || 420;

app.listen(port, () => {
  console.log('server now listening on ' + port);
});
