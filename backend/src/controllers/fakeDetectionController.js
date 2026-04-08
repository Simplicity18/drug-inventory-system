import { FakeReport } from '../models/FakeReport.js';
import { verifyMedicineAuthenticity } from '../services/fakeDetectionService.js';

export const verifyMedicine = async (req, res, next) => {
  try {
    const result = verifyMedicineAuthenticity(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getFakeReports = async (_req, res, next) => {
  try {
    const reports = await FakeReport.find().populate('medicine').sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    next(error);
  }
};
