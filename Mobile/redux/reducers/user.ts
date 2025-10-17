import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
    _id: string | null;
    name: string | null;
    isAdmin: boolean | null;
    token: string | null;
};

const initialState: UserState = { _id: null, name: null, isAdmin: null, token: null };

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        saveUserInfo: (state, action: PayloadAction<UserState>) => {
            const { _id, name, isAdmin, token } = action.payload;
            state._id = _id;
            state.name = name;
            state.isAdmin = isAdmin;
            state.token = token;
        },
        clearUserInfo: (state) => {
            state._id = null;
            state.name = null;
            state.isAdmin = null;
            state.token = null;
        }
    }
});

export const { saveUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;