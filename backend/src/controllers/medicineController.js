import { Medicine } from '../models/Medicine.js';
import { FakeReport } from '../models/FakeReport.js';
import { verifyMedicineAuthenticity } from '../services/fakeDetectionService.js';
import { triggerAutoReorderIfNeeded } from '../services/stockService.js';

export const getMedicines = async (req, res, next) => {
  try {
    const { search = '', status = '', lowStock = '' } = req.query;

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { batchNumber: { $regex: search, $options: 'i' } },
        { manufacturer: { $regex: search, $options: 'i' } }
      ];
    }

    if (status) {
      query.verificationStatus = status;
    }

    const medicines = await Medicine.find(query)
      .populate('supplier')
      .sort({ createdAt: -1 });

    const filtered =
      lowStock === 'true'
        ? medicines.filter((medicine) => medicine.quantityInStock < medicine.minimumThreshold)
        : medicines;

    res.json(filtered);
  } catch (error) {
    next(error);
  }
};

export const createMedicine = async (req, res, next) => {
  try {
    const medicine = await Medicine.create(req.body);

    const { status, reason } = verifyMedicineAuthenticity(medicine);
    medicine.verificationStatus = status;
    await medicine.save();

    if (status === 'FAKE') {
      await FakeReport.create({
        medicine: medicine._id,
        batchNumber: medicine.batchNumber,
        manufacturer: medicine.manufacturer,
        reason
      });
    }

    await triggerAutoReorderIfNeeded(medicine);

    const populated = await Medicine.findById(medicine._id).populate('supplier');
    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
};

export const updateMedicine = async (req, res, next) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found.' });
    }

    const { status, reason } = verifyMedicineAuthenticity(medicine);
    medicine.verificationStatus = status;
    await medicine.save();

    if (status === 'FAKE') {
      const existing = await FakeReport.findOne({ medicine: medicine._id, status: 'OPEN' });
      if (!existing) {
        await FakeReport.create({
          medicine: medicine._id,
          batchNumber: medicine.batchNumber,
          manufacturer: medicine.manufacturer,
          reason
        });
      }
    }

    await triggerAutoReorderIfNeeded(medicine);

    const populated = await Medicine.findById(medicine._id).populate('supplier');
    res.json(populated);
  } catch (error) {
    next(error);
  }
};

export const deleteMedicine = async (req, res, next) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found.' });
    }

    res.json({ message: 'Medicine deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
