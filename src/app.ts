import express, { Express, Request, Response } from 'express';
import router from './routers/actian.router';
import Logger from "./lib/logger";

let app: Express = express();
const PORT = 3000;

app.get('/', (_: Request, res: Response) => {
  Logger.info("Welcome API");
  res.send('Welcome to actian');
});

app.use('/actian', router);

app.listen(PORT, () => {
  Logger.info(`Server is running http://localhost:${PORT}/`);
});