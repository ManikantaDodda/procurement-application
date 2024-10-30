// models/Supplier.js
import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  supplierNo: { type: String, unique: true },
  supplierName: { type: String, required: true },
  address: String,
  taxNo: String,
  country: String,
  mobileNo: String,
  email: { type: String, unique: true },
  status: { type: String, default: 'Active', enum: ['Active', 'Inactive', 'Blocked'] }
});

const Supplier = mongoose.model('Supplier', supplierSchema);
export {Supplier};
