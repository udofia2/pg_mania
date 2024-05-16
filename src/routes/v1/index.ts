import { Router } from 'express';

import auth from './auth';
import users from './users';
import parcels from './parcel'

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/parcels', parcels);

export default router;
