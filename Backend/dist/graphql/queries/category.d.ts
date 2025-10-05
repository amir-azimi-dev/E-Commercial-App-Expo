import { CategoryDocument } from "../../db/models/category";
declare const getCategories: () => Promise<CategoryDocument[]>;
declare const getCategory: (_: unknown, { id }: {
    id: string;
}) => Promise<CategoryDocument>;
export { getCategories, getCategory };
//# sourceMappingURL=category.d.ts.map