import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authService";
//NOTE: using extractErrorMessage function to save some repetition
import { extractErrorMessage} from '../../utils'

//Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

//NOTE: remove isSuccess from state as we can infer from presence and absence of user
//There is no need for a reset function as we can do this in our pending cases
//No need for isError or messages as we can catch the AsyncThunkAction rejection in our component and we will have the error message there

const initialState = {
  user: user ? user : null,
  isLoading: false,
}

//Register new user
export const register = createAsyncThunk('auth/register',
async (user, thunksAPI) => {
  try {
    return await authService.register(user)
  } catch (error) {
    // const message = (error.response && error.response.data && error.response.data.message)
    // || error.message || error.toString()

    return thunksAPI.rejectWithValue(extractErrorMessage(error))
  }
} 
)

//Login user
export const login = createAsyncThunk('auth/login',
async (user, thunksAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    // const message = (error.response && error.response.data && error.response.data.message)
    // || error.message || error.toString()
    return thunksAPI.rejectWithValue(extractErrorMessage(error))
  }
} 
)

//Logout user
//Note: here we don't need a thunk as we are not doing anything async so we can use a createAction instead
export const logout = createAction('auth/logout', () => {
   authService.logout()
   //return an empty object as our payload as we don't need a payload but the 
   //prepare function requires a payload return
   return {}
})

//NOTE: in cases of login or register pending or rejected the user will already be null so no need to set to null in these cases


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
    },
    // reset: (state) => {
    //   state.isLoading = false
    //   state.isError = false
    //   state.isSuccess = false
    //   state.message = ''
    // }
  },
  extraReducers: (builder) => {
     builder
       .addCase(register.pending, (state) => {
        state.isLoading = true
       })
       .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
       })
       .addCase(register.rejected, (state) => {
        state.isLoading = false
       })
       .addCase(login.pending, (state) => {
        state.isLoading = true
       })
       .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
       })
       .addCase(login.rejected, (state) => {
        state.isLoading = false
       })
  }
})

export const {reset} = authSlice.actions
export default authSlice.reducer