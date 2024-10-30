import { Item } from "../models/Items.js";
import multer from "multer";
import mongoose from "mongoose";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage }).array('itemImages', 5);

export const createItem = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).send({status : "error" , message : err});

    try {
      const count = await Item.countDocuments() + 1;
      const images = req.files.map((file) => file.path);
      const item = new Item({ ...req.body, itemNo: `ITM${count}`, itemImages: images });
      await item.save();
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};

export const getItems = async (req, res) => {
  try {
    const items = await Item.find().populate('supplier');
    res.json(items);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const supplierItems = async (req, res) => {
    try {
        const supplierId = req.params.id;
        console.log(supplierId);

        if (!supplierId) {
            return res.status(400).send({ status: "error", message: "Missing required fields" });
        }

        if (!mongoose.isValidObjectId(supplierId)) {
            return res.status(400).send({ status: "error", message: "Invalid supplier ID" });
        }

        const items = await Item.find({ supplier: supplierId});

        return res.send({ status: "success", message: "Fetched Successfully", data: items });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: "error", message: "Internal Server Error" });
    }
};


export const UpdateStatusItems = async (req, res) => {
    try {
        const _id = req.body._id;
        const status = req.body.status;

        if (_id && status) {
            const update = await Item.findByIdAndUpdate(_id, { status }, { new: true });

            if (!update) {
                return res.status(404).json({ status: "error", message: "Item Id not Found" });
            }

            return res.send({ status: "success", data: update });
        } else {
            return res.status(400).json({ status: "error", message: "Missing required fields" });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
