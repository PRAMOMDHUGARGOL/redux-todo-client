import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Backdrop, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { fetchTodo, removeTodo, updateTodo } from "../features/todo/todoSlice";

const Todos = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.firebase);
  const { loading, todos } = useSelector((state) => state.todo);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchTodo(user.uid));
    }
  }, [dispatch]);

  const [update, setUpdate] = useState("");
  const [todoId, setTodoId] = useState("");
  const [index, setIndex] = useState("");

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Backdrop
        open={loading}
        style={{
          zIndex: "z-50",
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(2px)", // Add a backdrop filter for blur effect
          transform: "scale(1.05)", // Add a scaling effect
        }}
      >
        <CircularProgress color="inherit" size={50} thickness={5} />
      </Backdrop>

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-5">
        <ul className="divide-y divide-gray-200 px-4">
          {todos && todos.length > 0 ? (
            todos.map((todo, index) => (
              <li
                key={todo.id}
                className="py-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <label
                    htmlFor={`todo${index}`}
                    className="ml-3 block text-gray-900"
                  >
                    <span className="text-lg font-medium">{todo.text}</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      setUpdate(todo.text);
                      setTodoId(todo.id);
                      setIndex(index);
                      setOpen(true);
                    }}
                    className="text-black focus:outline-none font-bold mr-4"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() =>
                      dispatch(removeTodo({ id: todo.id, uid: user.uid }))
                    }
                    className="text-red-500 hover:text-red-700 focus:outline-none font-bold"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="py-4 text-gray-600 text-center text-2xl">
              No todos for today :( <br />
              Add some tasks!
            </li>
          )}
        </ul>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <DialogTitle className="text-lg font-bold mb-4 w-full">
              Modify Your Todo
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="updatedText"
                label="Enter Changes"
                type="text"
                fullWidth
                value={update}
                onChange={(e) => {
                  setUpdate(e.target.value);
                }}
                className="w-full mb-4"
              />
            </DialogContent>
            <DialogActions className="flex justify-end">
              <Button onClick={handleClose} color="secondary" className="mr-2">
                Go Back
              </Button>
              <Button
                onClick={() => {
                  dispatch(
                    updateTodo({
                      id: todoId,
                      text: update,
                      index: index,
                      uid: user.uid,
                    })
                  );
                  handleClose();
                  setUpdate("");
                  setTodoId("");
                  setIndex("");
                }}
                color="primary"
                className="ml-2"
              >
                Modify
              </Button>
            </DialogActions>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Todos;
