import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), "public", "uploads"));
    },
    filename: (req, file, cb) => {
        const uniqueFileName = crypto.randomUUID() + "-" + Date.now();
        cb(null, uniqueFileName + path.extname(file.originalname));
    }
});

const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed!"), false);
};

const upload = multer({ storage, fileFilter });

export default upload;