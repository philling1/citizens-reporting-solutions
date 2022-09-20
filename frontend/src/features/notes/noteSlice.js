import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import noteService from './noteService'
// NOTE: use a extractErrorMessage function to save some repetition
import { extractErrorMessage } from '../../utils'

const initialState = {
  notes: []
}

// Get ticket notes
export const getNotes = createAsyncThunk(
  'notes/getAll',
  async (ticketId, thunksAPI) => {
    try {
      const token = thunksAPI.getState().auth.user.token
      return await noteService.getNotes(ticketId, token)
    } catch (error) {
      return thunksAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Create ticket note
export const createNote = createAsyncThunk(
  'notes/create',
  async ({ noteText, ticketId }, thunksAPI) => {
    try {
      const token = thunksAPI.getState().auth.user.token
      return await noteService.createNote(noteText, ticketId, token)
    } catch (error) {
      return thunksAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        // NOTE: reset notes to null on pending so we can show a Spinner while
        // fetching notes
        state.notes = null
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        // NOTE: even if there are no notes for the ticket we get an empty
        // array, so we can use this to detect if we have notes or are fetching
        // notes. Payload will be an array of notes or an empty array, either
        // means we have finished fetching the notes.
        state.notes = action.payload
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload)
      })

  } 
})

export default noteSlice.reducer