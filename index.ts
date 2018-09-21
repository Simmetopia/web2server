import express from 'express';
import { RootApplication } from './application';

const app = express();

// logs all requests to the database

const rootApplication = new RootApplication(express.Router(), app);
app.use('', rootApplication.Router);

const port = process.env.PORT || 420;

app.listen(port, () => {
  console.log('server now listening on ' + port);
});
