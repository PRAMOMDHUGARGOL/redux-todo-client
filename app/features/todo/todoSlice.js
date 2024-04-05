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
const localURL = "http://localhost:8080/";

export const fetchTodo = createAsyncThunk("todo/fetchTodo", async () => {
  const response = await axios.get(`${apiURL || localURL}api/items`);
  return response.data.response;
});

export const addTodo = createAsyncThunk("todo/addTodo", async (data) => {
  const response = await axios.post(`${apiURL || localURL}api/add`, {
    id: nanoid(),
    text: data,
  });
  return response.data.response;
});

export const removeTodo = createAsyncThunk("todo/removeTodo", async (data) => {
  const response = await axios.post(`${apiURL || localURL}api/remove`, {
    id: data,
  });
  return response.data.response;
});

export const updateTodo = createAsyncThunk("todo/updateTodo", async (data) => {
  console.log(data);
  const response = await axios.post(`${apiURL || localURL}api/update`, {
    id: data.id,
    text: data.text,
    index: data.index,
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
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;

        state.todos.push(action.payload);
        state.response = "add";
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.response = "fetch";
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.error = action.error.message;
      });

    builder.addCase(removeTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter((item) => item.id != action.payload);
      state.response = "delete";
    });

    builder.addCase(updateTodo.fulfilled, (state, action) => {
      // Assuming you already have the index of the todo to be updated
      const index = action.payload.index;
      if (index >= 0 && index < state.todos.length) {
        // Create a copy of the state.todos array
        const updatedTodos = [...state.todos];
        // Update the specific todo item at the known index
        updatedTodos[index] = {
          id: action.payload.id,
          text: action.payload.text,
        };
        // Update the state with the new todos array
        state.todos = updatedTodos;
      }

      state.response = "update";
    });
  },
  // reducers: {
  //   addTodo: (state, action) => {
  //     const todo = {
  //       id: nanoid(),
  //       text: action.payload,
  //     };
  //     if (todo.text.length > 0) state.todos.push(todo);
  //   },

  //   removeTodo: (state, action) => {
  //     state.todos = state.todos.filter((todo) => todo.id !== action.payload);
  //   },

  //   updateTodo: (state, action) => {
  //     // Approach 1: (creates a new array looping each time which has time constraint, but good for multiple updates)
  //     // state.todos = state.todos.map((todo) => {
  //     //   // If the todo's id matches the id of the updated todo, return the updated todo
  //     //   if (todo.id === action.payload.id) {
  //     //     return action.payload;
  //     //   }
  //     //   // Otherwise, return the original todo
  //     //   return todo;
  //     // });

  //     //Approach 2: No time constraint just copy and change the index (immutability, but with a twist)
  //     const updatedTodo = action.payload[0];
  //     console.log(action.payload);
  //     // Assuming you already have the index of the todo to be updated
  //     const index = action.payload[1];
  //     if (index >= 0 && index < state.todos.length) {
  //       // Create a copy of the state.todos array
  //       const updatedTodos = [...state.todos];
  //       // Update the specific todo item at the known index
  //       updatedTodos[index] = updatedTodo;
  //       // Update the state with the new todos array
  //       state.todos = updatedTodos;
  //     }
  //   },
  // },
});

export const { changeStateTrue, changeStateFalse, clearResponse } =
  todoSlice.actions;

export default todoSlice.reducer;
