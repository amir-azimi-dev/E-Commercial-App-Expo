import { CategoryDocument } from "../../db/models/category";
import { CreateCategoryParams } from "../types/category";
declare const createCategory: (_: unknown, { title, color, icon, image }: CreateCategoryParams) => Promise<CategoryDocument>;
declare const editCategory: (_: unknown, { id, title, color, icon, image }: CreateCategoryParams & {
    id: string;
}) => Promise<CategoryDocument>;
declare const removeCategory: (_: unknown, { id }: {
    id: string;
}) => Promise<CategoryDocument>;
export { createCategory, editCategory, removeCategory };
//# sourceMappingURL=category.d.ts.map