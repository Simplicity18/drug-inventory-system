import express from 'express';
import {
  createSupplier,
  deleteSupplier,
  getSuppliers,
  updateSupplier
} from '../controllers/supplierController.js';

const router = express.Router();

router.get('/', getSuppliers);
router.post('/', createSupplier);
router.put('/:id', updateSupplier);
router.delete('/:id', deleteSupplier);

export default router;
