import { Item } from "../models/Items.js";
import { MULTERUPLOAD } from "../helper/multer_config.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream"; 

const upload = MULTERUPLOAD.array('itemImages', 5);

const itemUploader = async (buffer) => {
    try {
        const result = await uploadImageFromBuffer(buffer);
        return result.url;
    } catch (error) {
        console.error("Image upload error:", error.message);
        throw error;
    }
};

const uploadImageFromBuffer = (buffer) => {
    return new Promise((resolve, reject) => {
        const bufferStream = Readable.from(buffer);

        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "groupchat" },
            (error, result) => {
                if (error) {
                    console.error('Upload Error:', error);
                    return reject(error);
                }
                console.log('Upload Result:', result);
                resolve(result);
            }
        );

        bufferStream.pipe(uploadStream);
    });
};

export const createItem = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(500).send({ status: "error", message: err.message });

        try {
            const count = await Item.countDocuments() + 1;
            const images = await Promise.all(req.files.map((file) => itemUploader(file.buffer)));
            const item = new Item({ ...req.body, itemNo: `ITM${count}`, itemImages: images });
            await item.save();
            res.status(201).json(item);
        } catch (error) {
            res.status(500).json({ message: error.message });
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
