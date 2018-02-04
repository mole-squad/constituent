import { Router } from 'express';

import checkToken from '../../middleware/tokenMiddleware';
import * as ConstituencyController from '../controllers/ConstituencyController';
import { findByIdMiddleware } from '../controllers/util';
import Constituency from '../models/constituency';

const ConstituencyRouter = Router();

ConstituencyRouter.route('/:id').get(findByIdMiddleware(Constituency), ConstituencyController.show);
ConstituencyRouter.route('/:id/join').post(checkToken, findByIdMiddleware(Constituency), ConstituencyController.join)

export default ConstituencyRouter;