import { createSlice,  } from "@reduxjs/toolkit";

const initialState = {
    message: "", 
    type:"success", // due to throws an error during setting the null value in capitilize.js thats here we assigning an empty string 
    open:false
}

const snackBarSlice = createSlice({
    name: 'snackBarSlice',
    initialState,
    reducers: {
        handleSnackBar(state,action) {
            state.message=action.payload.snackMessage;
            state.type=action.payload.snackType;
            state.open=action.payload.snackOpen;
          return state;
        }
    }
})


export const { handleSnackBar } = snackBarSlice.actions;
export default snackBarSlice.reducer;
