import mongoose from 'mongoose';

const fakeReportSchema = new mongoose.Schema(
  {
    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medicine',
      required: true
    },
    batchNumber: {
      type: String,
      required: true,
      trim: true
    },
    manufacturer: {
      type: String,
      required: true,
      trim: true
    },
    reason: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ['OPEN', 'UNDER_REVIEW', 'CLOSED'],
      default: 'OPEN'
    }
  },
  { timestamps: true }
);

export const FakeReport = mongoose.model('FakeReport', fakeReportSchema);
