import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TasksState } from './tasks'
import { saveTask, getTask, getTasks, removeTask } from './actions'

const initialState: TasksState = {
    isLoading: false,
    totalCount: 0,
    tasks: [],
    tableOptions:{
        limit: 10,
        offset: 0,
        sort:'createdAt',
        sortOrder: 'DESC',
    }
}

export const taskSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload
    },
    setLimit: (state, action: PayloadAction<any>) => {
        state.tableOptions.limit = action.payload.limit
        state.tableOptions.offset = action.payload.offset
    },
    setSort: (state, action: PayloadAction<any>) => {
        state.tableOptions.sort = action.payload.sort
        state.tableOptions.sortOrder = action.payload.sortOrder
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeTask.pending, (state, action) => {
        state['isLoading'] = true
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state['isLoading'] = false
      })
      .addCase(removeTask.rejected, (state, action) => {
        state['isLoading'] = false
      })
      .addCase(saveTask.pending, (state, action) => {
        state['isLoading'] = true
      })
      .addCase(saveTask.fulfilled, (state, action) => {
        state['isLoading'] = false
      })
      .addCase(saveTask.rejected, (state, action) => {
        state['isLoading'] = false
      })
      .addCase(getTask.pending, (state, action) => {
        state['isLoading'] = true
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state['isLoading'] = false
        state['curTask'] = action?.payload?.task;
      })
      .addCase(getTask.rejected, (state, action) => {
        state['isLoading'] = false
      })
      .addCase(getTasks.pending, (state, action) => {
        state['isLoading'] = true
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state['isLoading'] = false
        state['tasks'] = action?.payload?.list || [];
        state['totalCount'] = action?.payload?.totalCount || 0;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state['isLoading'] = false
      })
    }
})

// Action creators are generated for each case reducer function
export const { setLimit, setSort, setIsLoading} = taskSlice.actions

export default taskSlice.reducer