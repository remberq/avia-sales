import { configureStore } from '@reduxjs/toolkit'

import { checkbox, tickets } from './checkBoxSlice'
export const store = configureStore({
  reducer: {
    status: checkbox,
    tickets: tickets,
  },
})
