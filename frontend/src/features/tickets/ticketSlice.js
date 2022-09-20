import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from './ticketService'
import { extractErrorMessage } from '../../utils'

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

//create new ticket
export const createTicket = createAsyncThunk('tickets/create',
async (ticketData, thunksAPI) => {
  try {
    const token = thunksAPI.getState().auth.user.token
    return await ticketService.createTicket(ticketData, token)
  } catch (error) {
    return thunksAPI.rejectWithValue(extractErrorMessage(error))
  }
} 
)

//Get user tickets
export const getTickets = createAsyncThunk('tickets/getAll',
async (_, thunksAPI) => {
  try {
    const token = thunksAPI.getState().auth.user.token
    return await ticketService.getTickets(token)
  } catch (error) {
    return thunksAPI.rejectWithValue(extractErrorMessage(error))
  }
} 
)

//Get the user single ticket
export const getTicket = createAsyncThunk('tickets/get',
async (ticketId, thunksAPI) => {
  try {
    const token = thunksAPI.getState().auth.user.token
    return await ticketService.getTicket(ticketId, token)
  } catch (error) {
    return thunksAPI.rejectWithValue(extractErrorMessage(error))
  }
} 
)

// Close ticket
export const closeTicket = createAsyncThunk(
  'tickets/close',
  async (ticketId, thunksAPI) => {
    try {
      const token = thunksAPI.getState().auth.user.token
      return await ticketService.closeTicket(ticketId, token)
    } catch (error) {
      return thunksAPI.rejectWithValue(extractErrorMessage(error))
    } 
  }
)

export const  ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  extraReducers: (builder) => {
    builder
      // .addCase(createTicket.pending, (state) => {
      //   state.isLoading = true
      // })
      // .addCase(createTicket.fulfilled, (state) => {
      //   state.isLoading = false
      //   state.isSuccess = true
      // })
      // .addCase(createTicket.rejected, (state, action) => {
      //   state.isLoading = false
      //   state.isError = true
      //   state.message = action.payload
      // })
      .addCase(getTickets.pending, (state) => {
        state.ticket = null
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.tickets = action.payload
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.ticket = action.payload
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.ticket = action.payload
        state.tickets = state.tickets.map((ticket) =>
          ticket._id === action.payload._id ? action.payload : ticket
        )
      })
      
  }
})

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer