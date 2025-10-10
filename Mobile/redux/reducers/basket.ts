import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductPreview } from "types";

type BasketItem = ProductPreview & { quantity: number };
type BasketState = {
    basket: BasketItem[]
};

const initialState: BasketState = { basket: [] };

const basketSlice = createSlice({
    name: "Basket",
    initialState,
    reducers: {
        addOne: (state, action: PayloadAction<BasketItem>) => {
            if (state.basket.some(item => item._id === action.payload._id)) return state;
            state.basket.push(action.payload);
        },
        removeOne: (state, action: PayloadAction<string>) => {
            state.basket = state.basket.filter(item => item._id !== action.payload);
        },
        clearBasket: (state) => {
            state.basket = [];
        }
    }
});

export const { addOne, removeOne, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;