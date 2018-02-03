import { Router } from 'express';

import * as AuthController from '../controllers/AuthController';

const AuthRouter = new Router();

AuthRouter.route('/facebooklogin')
  .post(AuthController.facebookLogin, (req, res, next) => {
    const token = AuthController.getToken(req.user);

    res.send(token);
  });

export default AuthRouter;