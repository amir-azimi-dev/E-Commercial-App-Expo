import { OrderDocument } from "../../db/models/order";
import { PlaceOrderParams, UpdateOrderStatusParams } from "../types/order";
declare const placeOrder: (_: unknown, { orderItems, shippingAddress1, shippingAddress2, phone, city, zip, country }: PlaceOrderParams, context: any) => Promise<OrderDocument>;
declare const updateOrderStatus: (_: unknown, { id, newStatus }: UpdateOrderStatusParams) => Promise<OrderDocument>;
declare const removeOrder: (_: unknown, { id }: {
    id: string;
}) => Promise<OrderDocument>;
export { placeOrder, updateOrderStatus, removeOrder };
//# sourceMappingURL=order.d.ts.map