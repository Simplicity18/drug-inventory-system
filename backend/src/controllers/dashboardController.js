import { Medicine } from '../models/Medicine.js';
import { FakeReport } from '../models/FakeReport.js';

export const getDashboardSummary = async (_req, res, next) => {
  try {
    const medicines = await Medicine.find();
    const lowStockCount = medicines.filter((item) => item.quantityInStock < item.minimumThreshold).length;
    const fakeAlertCount = await FakeReport.countDocuments({ status: { $in: ['OPEN', 'UNDER_REVIEW'] } });

    res.json({
      totalMedicines: medicines.length,
      lowStockAlerts: lowStockCount,
      fakeMedicineAlerts: fakeAlertCount
    });
  } catch (error) {
    next(error);
  }
};
