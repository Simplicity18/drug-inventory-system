import express from 'express';
import { getFakeReports, verifyMedicine } from '../controllers/fakeDetectionController.js';

const router = express.Router();

router.post('/verify', verifyMedicine);
router.get('/reports', getFakeReports);

export default router;
