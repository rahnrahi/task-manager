import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "utils/request";
import { TableOptions, Tasks } from "./tasks";
import { GridRowId } from "@mui/x-data-grid";

export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (props: TableOptions, api) => {
    const userId = localStorage.getItem("userId");
    try {
      let response: any = await request(
        `tasks?userId=${userId}&limit=${props.limit}&offset=${props.offset}&sort=${props.sort}&order=${props.sortOrder}`
      );
      return processTaskResponse(response);
    } catch (error) {
      api.rejectWithValue(error);
    }
  }
);

export const saveTask = createAsyncThunk(
  "task/saveTask",
  async (payload: object, api) => {
    const taskId = payload['taskId'];
    delete payload['taskId'];
    try {
      let response: any = await request(
        `tasks/${taskId}`,
        {
          method: taskId===''?"POST":"PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      return {
        response
      };
    } catch (error) {
      api.rejectWithValue(error);
    }
  }
);

export const removeTask = createAsyncThunk(
  "task/removeTask",
  async (taskId: GridRowId, api) => {
    try {
      let response: any = await request(
        `tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      return {
        response
      };
    } catch (error) {
      api.rejectWithValue(error);
    }
  }
);

export const getTask = createAsyncThunk(
  "task/getTask",
  async (taskId: GridRowId, api) => {
    try {
      let response: any = await request(
        `tasks/${taskId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      return {
        task: response
      };
    } catch (error) {
      api.rejectWithValue(error);
    }
  }
);

const processTaskResponse = (
  response: any
): {
  totalCount: number;
  list: Tasks[];
} => {
  return {
    totalCount: response.totalCount,
    list: response.list,
  };
};
