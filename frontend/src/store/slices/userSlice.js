import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    username: null,
    isAdmin: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser(state, action){
            state.username = action.payload.username;
            state.isAdmin = action.payload.isAdmin;
        },
        clearUser(state){
            state.username = null;
            state.isAdmin = false;
        },
    }
});

export const {setUser, clearUser} = userSlice.actions;

export default userSlice.reducer;