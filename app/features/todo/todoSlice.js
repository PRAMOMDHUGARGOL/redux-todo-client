import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  updateState: false,
  loading: false,
  error: "",
  response: "",
};
const apiURL = "https://redux-todo-server-h9sx.onrender.com/";
// "https://redux-todo-server-h9sx.onrender.com/";
// const localURL = "http://localhost:8080/";

export const fetchTodo = createAsyncThunk("todo/fetchTodo", async (data) => {
  try {
    const response = await axios.post(`${apiURL}api/items`, {
      uid: data,
    });
    return response.data.response;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
});

export const addTodo = createAsyncThunk("todo/addTodo", async (data) => {
  const response = await axios.post(`${apiURL}api/add`, {
    id: nanoid(),
    text: data.text,
    uid: data.uid,
  });
  return response.data.response;
});

export const removeTodo = createAsyncThunk("todo/removeTodo", async (data) => {
  const response = await axios.post(`${apiURL}api/remove`, {
    id: data.id,
    uid: data.uid,
  });
  return response.data.response;
});

export const updateTodo = createAsyncThunk("todo/updateTodo", async (data) => {
  const response = await axios.post(`${apiURL}api/update`, {
    id: data.id,
    text: data.text,
    index: data.index,
    uid: data.uid,
    completed: data.completed,
    sender: data.sender,
  });
  return response.data.response;
});

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    changeStateTrue: (state) => {
      state.updateState = true;
    },
    changeStateFalse: (state) => {
      state.updateState = false;
    },
    clearResponse: (state) => {
      state.response = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(addTodo.pending, (state) => {})
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        state.response = "";
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.error.message;
      });

    builder
      .addCase(fetchTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
        state.response = "Getting all your plans! Hold on :)";
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.error = action.error.message;
      });

    builder.addCase(removeTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = state.todos.filter((item) => item.id != action.payload);
      state.response = "Deleting item! Hold Tight";
    });

    builder
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;

        // Assuming you already have the index of the todo to be updated
        const index = action.payload.index;
        if (index >= 0 && index < state.todos.length) {
          // Create a copy of the state.todos array
          const updatedTodos = [...state.todos];
          // Update the specific todo item at the known index
          updatedTodos[index] = {
            id: action.payload.id,
            text: action.payload.text,
            completed: action.payload.completed,
          };

          // Update the state with the new todos array
          state.todos = updatedTodos;
        }
        state.response = "update";
      });
  },
});

export const { changeStateTrue, changeStateFalse, clearResponse } =
  todoSlice.actions;

export default todoSlice.reducer;
