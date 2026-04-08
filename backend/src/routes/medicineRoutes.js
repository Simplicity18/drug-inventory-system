import express from 'express';
import {
  createMedicine,
  deleteMedicine,
  getMedicines,
  updateMedicine
} from '../controllers/medicineController.js';

const router = express.Router();

router.get('/', getMedicines);
router.post('/', createMedicine);
router.put('/:id', updateMedicine);
router.delete('/:id', deleteMedicine);

export default router;
