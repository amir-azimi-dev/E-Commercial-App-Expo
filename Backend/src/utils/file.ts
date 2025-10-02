import path from "path";
import fs from "fs/promises";

const removeFile = async (filename: string): Promise<void> => {
    try {
        const filePath = path.join(process.cwd(), "public", "uploads", filename);
        await fs.unlink(filePath);

    } catch (error) {
        console.log(error);
    }
};

export { removeFile };