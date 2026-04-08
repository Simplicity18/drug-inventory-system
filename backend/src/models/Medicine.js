import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    batchNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    manufacturer: {
      type: String,
      required: true,
      trim: true
    },
    expiryDate: {
      type: Date,
      required: true
    },
    quantityInStock: {
      type: Number,
      required: true,
      min: 0
    },
    minimumThreshold: {
      type: Number,
      required: true,
      default: 10,
      min: 0
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
      required: true
    },
    wholesalerInfo: {
      type: String,
      default: '',
      trim: true
    },
    verificationStatus: {
      type: String,
      enum: ['VERIFIED', 'FAKE', 'PENDING'],
      default: 'PENDING'
    },
    pendingOrder: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export const Medicine = mongoose.model('Medicine', medicineSchema);
