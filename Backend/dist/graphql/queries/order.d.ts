import { OrderDocument } from "../../db/models/order";
declare const getOrders: () => Promise<OrderDocument[]>;
declare const getOrder: (_: unknown, { id }: {
    id: string;
}) => Promise<OrderDocument>;
export { getOrders, getOrder };
//# sourceMappingURL=order.d.ts.map