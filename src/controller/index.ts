import express, { Router } from 'express';
import schoolController from './school.controller';
import tradeController from './trade.controller';
const router = express.Router();

router.use('/trade', tradeController);

export default router;