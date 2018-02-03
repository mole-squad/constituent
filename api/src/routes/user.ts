import { Router } from 'express';

import * as UserController from '../controllers/UserController';
import checkToken from '../../middleware/tokenMiddleware';

const UserRouter = new Router();

UserRouter.route('/me').get(checkToken, UserController.profile);
  

export default UserRouter;