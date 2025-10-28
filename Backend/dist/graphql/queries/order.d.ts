import { OrderDocument } from "../../db/models/order";
declare const getOrders: () => Promise<OrderDocument[]>;
declare const getOrder: (_: unknown, { id }: {
    id: string;
}) => Promise<OrderDocument>;
declare const getUserOrders: (_: unknown, __: unknown, context: any) => Promise<OrderDocument[]>;
export { getOrders, getOrder, getUserOrders };
//# sourceMappingURL=order.d.ts.map