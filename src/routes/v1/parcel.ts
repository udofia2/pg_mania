import { Router } from 'express';

import { createParcel, show, trackParcel, list } from 'controllers/parcels';
import { checkJwt } from 'middleware/checkJwt';
import { validatorCreateParcel } from 'middleware/validation/parcels';

const router = Router();

router
  .post('/', [checkJwt, validatorCreateParcel], createParcel)
  .get('/', [checkJwt], list);

router.get('/:id([0-9]+)', [checkJwt], show);
router.get('/track/:id([0-9]+)', [checkJwt], trackParcel);

export default router;
