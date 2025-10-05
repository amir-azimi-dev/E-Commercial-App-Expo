import { ProductDocument } from "../../db/models/product";
import { CreateProductParams } from "../types/product";
declare const createProduct: (_: unknown, { title, description, richDescription, image, images, brand, price, category, countInStock, rating, reviewsCount, isFeatured }: CreateProductParams) => Promise<ProductDocument>;
declare const editProduct: (_: unknown, { id, title, description, richDescription, image, images, brand, price, category, countInStock, rating, reviewsCount, isFeatured }: CreateProductParams & {
    id: string;
}) => Promise<ProductDocument>;
declare const removeProduct: (_: unknown, { id }: {
    id: string;
}) => Promise<ProductDocument>;
export { createProduct, editProduct, removeProduct };
//# sourceMappingURL=product.d.ts.map