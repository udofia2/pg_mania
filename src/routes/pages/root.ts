import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
  res.status(200).header('Content-Type', 'text/html').send(`<h4>🚚📦📦 PACKAGE TRACKING RESTful API</h4>`);
});

export default router;
