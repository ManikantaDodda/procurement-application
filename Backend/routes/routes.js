import express from "express";
import { createSupplier, getSuppliers, UpdateStatusSuppliers } from "../controllers/supplierController.js";
import { createItem, getItems,supplierItems, UpdateStatusItems } from "../controllers/itemController.js";
import { createPurchaseOrder, getPurchaseOrders } from "../controllers/orderController.js";
const router = express.Router();

router.post("/create-supplier", createSupplier);
router.get("/get-suppliers", getSuppliers);
router.patch("/supplier-status-change", UpdateStatusSuppliers);
router.post("/create-item", createItem);
router.get("/get-items", getItems);
router.get("/get-items/:id", supplierItems);
router.patch("/item-status-change", UpdateStatusItems);
router.post("/create-purchase-order", createPurchaseOrder);
router.get("/get-purchase-orders", getPurchaseOrders);

export {router};