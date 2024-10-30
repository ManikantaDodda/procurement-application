import mongoose from "mongoose";

const lineItemSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  itemNo : String,
  orderQty: Number,
  discount: Number,
  itemAmount: Number,
  netAmount: Number
});

const purchaseOrderSchema = new mongoose.Schema({
  orderNo: { type: String, unique: true },
  orderDate: { type: Date, default: Date.now },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  itemTotal: Number,
  discountTotal: Number,
  netAmount: Number,
  items: [lineItemSchema]
});

const PurchaseOrder = mongoose.model('Order', purchaseOrderSchema);
export { PurchaseOrder };