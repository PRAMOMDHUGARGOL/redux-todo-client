import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { fetchTodo, removeTodo, updateTodo } from "../features/todo/todoSlice";

const Todos = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  const todos = useSelector((state) => state.todos);

  const [update, setUpdate] = useState("");
  const [todoId, setTodoId] = useState("");
  const [index, setIndex] = useState("");

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div class="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
        <ul className="divide-y divide-gray-200 px-4">
          {todos &&
            todos.map((todo, index) => (
              <>
                <li
                  key={todo.id}
                  className="py-4 flex items-center justify-between"
                >
                  <div
                    className="flex items-center"
                    onClick={() => {
                      setUpdate(todo.text);
                      setTodoId(todo.id);
                      setIndex(index);
                      setOpen(true);
                    }}
                  >
                    <label
                      htmlFor={`todo${index}`}
                      className="ml-3 block text-gray-900"
                    >
                      <span className="text-lg font-medium">{todo.text}</span>
                    </label>
                  </div>

                  <button
                    onClick={() => dispatch(removeTodo(todo.id))}
                    className="text-red-500 hover:text-red-700 focus:outline-none font-bold"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </li>
              </>
            ))}
        </ul>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="updatedText"
            label="Updated Todo Text"
            type="text"
            fullWidth
            value={update}
            onChange={(e) => {
              setUpdate(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch(updateTodo({ id: todoId, text: update, index: index }));
              handleClose();
              setUpdate("");
              setTodoId("");
              setIndex("");
            }}
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Todos;
