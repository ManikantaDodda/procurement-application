import multer from "multer";
const storage = multer.memoryStorage();
export const MULTERUPLOAD = multer({storage:storage});