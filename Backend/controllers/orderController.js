import { PurchaseOrder } from "../models/Orders.js";

export const createPurchaseOrder = async (req, res) => {
  try {
    const count = await PurchaseOrder.countDocuments() + 1;
    const orderNo = `ORD${count}`;
    const { items } = req.body;
    const itemTotal = items.reduce((sum, item) => sum + item.itemAmount, 0);
    const discountTotal = items.reduce((sum, item) => sum + item.discount, 0);
    const netAmount = itemTotal - discountTotal;

    const purchaseOrder = new PurchaseOrder({ ...req.body, orderNo, itemTotal, discountTotal, netAmount });
    await purchaseOrder.save();
    res.status(201).json(purchaseOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPurchaseOrders = async (req, res) => {
  try {
    const orders = await PurchaseOrder.find().populate('supplier', 'supplierNo supplierName').populate('items.item');
    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
