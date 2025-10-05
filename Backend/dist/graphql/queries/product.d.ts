import { ProductDocument } from "../../db/models/product";
import { GetProductsParams } from "../types/product";
declare const getProducts: (_: unknown, { count, categories, onlyFeaturedProducts }: GetProductsParams) => Promise<ProductDocument[]>;
export { getProducts };
//# sourceMappingURL=product.d.ts.map