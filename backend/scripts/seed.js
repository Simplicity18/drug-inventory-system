import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB } from '../src/config/db.js';
import { Supplier } from '../src/models/Supplier.js';
import { Medicine } from '../src/models/Medicine.js';
import { User } from '../src/models/User.js';

dotenv.config();

await connectDB();

await Promise.all([Supplier.deleteMany({}), Medicine.deleteMany({}), User.deleteMany({})]);

const suppliers = await Supplier.insertMany([
  {
    name: 'Prime Health Supplies',
    contactPerson: 'Alice Morgan',
    email: 'alice@primehealth.com',
    phone: '555-100-2001',
    address: '12 Main Street, New York'
  },
  {
    name: 'CarePlus Wholesale',
    contactPerson: 'David Green',
    email: 'david@careplus.com',
    phone: '555-100-2002',
    address: '48 Market Street, Chicago'
  }
]);

await Medicine.insertMany([
  {
    name: 'Amoxicillin 500mg',
    batchNumber: 'AMX-2026-001',
    manufacturer: 'HealthCorp Labs',
    expiryDate: new Date('2027-12-30'),
    quantityInStock: 60,
    minimumThreshold: 20,
    price: 9.99,
    supplier: suppliers[0]._id,
    wholesalerInfo: 'Preferred cold-chain delivery'
  },
  {
    name: 'Paracetamol 650mg',
    batchNumber: 'PCM-2026-778',
    manufacturer: 'MedLife Pharma',
    expiryDate: new Date('2028-05-15'),
    quantityInStock: 8,
    minimumThreshold: 15,
    price: 4.25,
    supplier: suppliers[1]._id,
    wholesalerInfo: 'Bulk pack only'
  },
  {
    name: 'Counterfeit Demo Drug',
    batchNumber: 'UNKNOWN-FAKE-99',
    manufacturer: 'Suspicious Pharma',
    expiryDate: new Date('2027-08-18'),
    quantityInStock: 22,
    minimumThreshold: 10,
    price: 12.5,
    supplier: suppliers[1]._id,
    wholesalerInfo: 'Pending manual quality review'
  }
]);

const hashedPassword = await bcrypt.hash('admin123', 10);
await User.create({
  name: 'Inventory Admin',
  email: 'admin@druginventory.com',
  password: hashedPassword,
  role: 'admin'
});

console.log('Seed data inserted successfully.');
await mongoose.disconnect();
