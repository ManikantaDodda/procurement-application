import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemNo: { type: String, unique: true },
  itemName: { type: String, required: true },
  inventoryLocation: String,
  brand: String,
  category: String,
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  stockUnit: String,
  unitPrice: Number,
  itemImages: [String],
  status: { type: String, default: 'Enabled', enum: ['Enabled', 'Disabled'] }
});

const Item = mongoose.model('Item', itemSchema);
export { Item }
