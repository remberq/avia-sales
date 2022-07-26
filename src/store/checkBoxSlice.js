import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getFetchTickets = createAsyncThunk('tickets/getFetchTickets', async function (_, { rejectWithValue }) {
  try {
    const tickets = await fetch(
      'https://aviasales-test-api.kata.academy/tickets?searchId=5c1ea16612590b5a25943d7c2eb2f138'
    )
    if (!tickets.ok) {
      throw new Error('Opps')
    }
    const result = await tickets.json()
    console.log(result)
    return result.tickets
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

const checkBoxSlice = createSlice({
  name: 'checkbox',
  initialState: {
    checkboxStatus: [],
    ticketStatus: ['cheap'],
  },
  reducers: {
    addStatus(state, action) {
      state.checkboxStatus.push(action.payload.id)
    },
    deleteStatus(state, action) {
      state.checkboxStatus = state.checkboxStatus.filter((item) => item !== action.payload.id)
    },
    clearAllStatus(state) {
      state.checkboxStatus = []
    },
    changeTicketStatus(state, action) {
      if (!state.ticketStatus.includes(action.payload.text)) {
        state.ticketStatus.length = 0
        state.ticketStatus.push(action.payload.text)
      }
    },
  },
})

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    loadStatus: false,
    errors: false,
  },
  reducers: {},
  extraReducers: {
    [getFetchTickets.pending]: (state) => {
      state.loadStatus = true
      state.errors = false
    },
    [getFetchTickets.fulfilled]: (state, action) => {
      state.loadStatus = false
      state.tickets = action.payload
    },
    [getFetchTickets.rejected]: (state, action) => {
      state.loadStatus = true
      state.errors = action.payload
    },
  },
})

const reducer = {
  checkbox: checkBoxSlice.reducer,
  tickets: ticketsSlice.reducer,
}

export const { addStatus, deleteStatus, clearAllStatus, changeTicketStatus } = checkBoxSlice.actions
export const { addTickets } = ticketsSlice.actions
export const { checkbox, tickets } = reducer
