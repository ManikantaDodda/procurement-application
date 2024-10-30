import { Supplier } from "../models/Suppliers.js";

export const createSupplier = async (req, res) => {
  try {
    const count = await Supplier.countDocuments() + 1;
    const supplier = new Supplier({ ...req.body, supplierNo: `SUP${count}` });
    await supplier.save();
    res.status(201).json(supplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSuppliers = async (req, res) => {
  try {
    let where = {};
    if(req.query.status !== 'all')
    {
        where = {status : "Active"};
    }
    const suppliers = await Supplier.find(where);
    res.json(suppliers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const UpdateStatusSuppliers = async (req, res) => {
    try {
        const _id = req.body._id;
        const status = req.body.status;

        if (_id && status) {
            const update = await Supplier.findByIdAndUpdate(_id, { status }, { new: true });

            if (!update) {
                return res.status(404).json({ status: "error", message: "Supplier Id not Found" });
            }

            return res.send({ status: "success", data: update });
        } else {
            return res.status(400).json({ status: "error", message: "Missing required fields" });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

