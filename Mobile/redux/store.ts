import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./reducers/basket";
import userReducer from "./reducers/user";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        basket: basketReducer,
        user: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export default store;