import { ProductDocument } from "../../db/models/product";
import { GetProductsParams } from "../types/product";
declare const getProducts: (_: unknown, { count, categories, onlyFeaturedProducts }: GetProductsParams) => Promise<ProductDocument[]>;
declare const getProduct: (_: unknown, { id }: {
    id: string;
}) => Promise<ProductDocument>;
export { getProducts, getProduct };
//# sourceMappingURL=product.d.ts.map