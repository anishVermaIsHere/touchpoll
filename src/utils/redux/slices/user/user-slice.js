import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userSignin, userSignup } from "../../../services/api/user-api";



const initialState = {
    auth: {
        isAuthenticated:false,
        name: null,
        email: null,
        token: null,
        message: null,
        error: null
    },
    loading: false
}


// async thunk for signin 
export const signIn = createAsyncThunk(
    'signIn',
    async (formData) => {
        const response = await userSignin(formData);
        return response.data;
    }
)

// async thunk for signup
export const signUp = createAsyncThunk(
    'signUp',
    async (formData) => {
        const response = await userSignup(formData);
        return response.data;
    }
)

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        handleAuthUser(state, action) {
            let authUser = action.payload;
            if (authUser) {
                state.auth.name = authUser.name;
                state.auth.email = authUser.email;
                state.auth.token = authUser.token;
            }
            else {
                state.auth.name = null;
                state.auth.email = null;
                state.auth.token = null;
                state.auth.message = null;
            }
            return state;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(signIn.fulfilled, (state, action) => {
            // window.location.reload();
            state.auth.message = action.payload.message;
            state.auth.name = action.payload.name;
            localStorage.setItem('user-info', JSON.stringify({
                name: action.payload.name,
                email: action.payload.email,
                token: action.payload.token,
            }));
            state.loading = false;
        })
        builder.addCase(signIn.rejected, (state, action) => {
            state.loading = false;
            state.auth.message = action.error;
        })
        builder.addCase(signUp.pending, (state, action) => {
            state.loading = true;
            // state.auth.message = action.payload;    // its optional but don't set "action.payload.message"
        })
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.loading = false;
            state.auth.message = action.payload.message;
        })
        builder.addCase(signUp.rejected, (state, action) => {
            state.loading = false;
            state.auth.error="Error while signup";  // here there is no response will come so specify a constant error message
        })
    },
})


export const { handleAuthUser } = userSlice.actions;
export default userSlice.reducer;
