import { Router } from 'express';

import AuthRouter from './routes/auth';
import ConstituencyRouter from './routes/constituency';
import UserRouter from './routes/user';

export default function registerRoutes(app) {
  app.use('/auth', AuthRouter);
  app.use('/constituency', ConstituencyRouter);
  app.use('/users', UserRouter);
}
