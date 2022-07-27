import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getFetchTickets = createAsyncThunk('tickets/getFetchTickets', async function (_, { dispatch, getState }) {
  for (let i = 0; i < 20; i++) {
    try {
      const { tickets } = getState()
      const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${tickets.searchID}`)
      if (!response.ok) {
        throw new Error('Something going wrong')
      }
      const ticket = await response.json()
      if (ticket.stop) {
        break
      }
      dispatch(addTickets({ ticket }))
    } catch (e) {
      i -= 1
    }
  }
})

export const getSearchID = createAsyncThunk('tickets/getSearchID', async function () {
  try {
    const response = fetch('https://aviasales-test-api.kata.academy/search')
    const ID = (await response).json()
    return await ID
  } catch (e) {
    console.log(e)
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
    searchID: null,
    loadStatus: false,
    errors: false,
  },
  reducers: {
    addTickets(state, action) {
      const tickets = action.payload.ticket.tickets
      state.tickets = [...state.tickets, ...tickets]
    },
  },
  extraReducers: {
    [getFetchTickets.pending]: (state) => {
      if (!state.tickets.length) {
        state.loadStatus = true
      }
      state.loadStatus = false
      state.errors = false
    },
    [getFetchTickets.fulfilled]: (state) => {
      state.loadStatus = false
    },
    [getFetchTickets.rejected]: (state, action) => {
      state.loadStatus = true
      state.errors = action.payload
    },
    [getSearchID.fulfilled]: (state, action) => {
      state.searchID = action.payload['searchId']
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
