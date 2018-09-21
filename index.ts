import express from 'express';
import { RootApplication } from './application';



const app = express();
const rootApplication = new RootApplication(express.Router(), app);
app.use('', rootApplication.Router);

const port = process.env.PORT || 420;

app.listen(port, () => {
  console.log('server now listening on ' + port);
});
