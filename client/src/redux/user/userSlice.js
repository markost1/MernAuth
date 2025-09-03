import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser : null,
    error:null,
    loading:false,
    
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signUpStart:(state)=>{
            state.loading = true
        },
        signUpSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;
        },
        signUpFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        signInStart: (state)=>{
            state.loading = true;
        },
        signInSuccess : (state,action)=>{
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;
        },
        signInFailure : (state,action) =>{
            state.error = action.payload;
            state.loading = false;

        },
        vertificationStart:(state)=>{
            state.loading = true;
        }, 
        vertificationSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;

        },
        vertificationFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        clearError: (state) => { state.error = null; },
    }
  }
)

export const {signInStart,
    signInSuccess,
    signInFailure,
    signUpStart,
    signUpSuccess,
    signUpFailure,
    clearError,
    vertificationStart,
    vertificationFailure,
    vertificationSuccess
            } = userSlice.actions;
export default  userSlice.reducer;