import { createSlice } from "@reduxjs/toolkit";

const state = {
    userId: null,
    userName: null,
    userEmail: null,
    Avatar: null,
    stateChange: false
};

export const authSlice = createSlice({
    name: "auth",
    initialState: state,
    reducers: {
        updateUserProfile: (state, { payload }) => (
            {
                ...state,
                userId: payload.userId,
                userName: payload.userName,
                userEmail: payload.email,
                Avatar: payload.userImage
            }),
        authStateChange: (state, { payload }) => ({
            ...state,
            stateChange: payload.stateChange
        }),
        authSignOut: () => state,
    }
});

