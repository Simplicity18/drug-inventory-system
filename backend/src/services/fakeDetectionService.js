import { trustedBatchRegistry } from '../utils/trustedRegistry.js';

export const verifyMedicineAuthenticity = ({ batchNumber, manufacturer }) => {
  const normalizedBatch = batchNumber?.trim().toUpperCase();
  const normalizedManufacturer = manufacturer?.trim().toLowerCase();

  const match = trustedBatchRegistry.some(
    (item) =>
      item.batchNumber.toUpperCase() === normalizedBatch &&
      item.manufacturer.toLowerCase() === normalizedManufacturer
  );

  if (!match) {
    return {
      status: 'FAKE',
      reason: 'Batch number and manufacturer pair not found in trusted registry.'
    };
  }

  return {
    status: 'VERIFIED',
    reason: 'Medicine matched trusted batch registry.'
  };
};
