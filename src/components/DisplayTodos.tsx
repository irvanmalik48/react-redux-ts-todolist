import { useState } from "react";
import { connect } from "react-redux";
import {
  addTodos,
  completeTodos,
  removeTodos,
  updateTodos,
} from "../redux/reducer";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";

const mapStateToProps = (state: any) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (
  dispatch: (arg0: {
    payload: any;
    type:
    | "todos/addTodos"
    | "todos/updateTodos"
    | "todos/removeTodos"
    | "todos/completeTodos";
  }) => any
) => {
  return {
    addTodo: (obj: any) => dispatch(addTodos(obj)),
    removeTodo: (id: any) => dispatch(removeTodos(id)),
    updateTodo: (obj: any) => dispatch(updateTodos(obj)),
    completeTodo: (id: any) => dispatch(completeTodos(id)),
  };
};

const DisplayTodos = (props: {
  todos: any[];
  removeTodo: any;
  updateTodo: any;
  completeTodo: any;
}) => {
  const [sort, setSort] = useState("active");
  return (
    <div className="flex flex-col justify-center items-center gap-5 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-5 w-full">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("active")}
          className="w-full rounded-full px-5 py-2 bg-neutral-800 focus:bg-neutral-700 transition disabled:bg-neutral-900 disabled:text-neutral-500"
          disabled={sort === "active"}
        >
          Incomplete
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("completed")}
          className="w-full rounded-full px-5 py-2 bg-neutral-800 focus:bg-neutral-700 transition disabled:bg-neutral-900 disabled:text-neutral-500"
          disabled={sort === "completed"}
        >
          Completed
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("all")}
          className="w-full rounded-full px-5 py-2 bg-neutral-800 focus:bg-neutral-700 transition disabled:bg-neutral-900 disabled:text-neutral-500"
          disabled={sort === "all"}
        >
          All
        </motion.button>
      </div>
      <section
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 justify-center items-center"
      >
        <AnimatePresence>
          {props.todos.length === 0 ? (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-xl font-bold text-neutral-200 w-full text-center col-span-1 md:col-span-2"
            >
              Looks like you have nothing to do!
            </motion.h1>
          ) : null}
          {props.todos.length > 0 && sort === "active"
            ? props.todos.map(
              (item: {
                completed: boolean;
                id: React.Key | null | undefined;
              }) => {
                return (
                  item.completed === false && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      removeTodo={props.removeTodo}
                      updateTodo={props.updateTodo}
                      completeTodo={props.completeTodo}
                    />
                  )
                );
              }
            )
            : null}
          {props.todos.length > 0 && sort === "completed"
            ? props.todos.map(
              (item: {
                completed: boolean;
                id: React.Key | null | undefined;
              }) => {
                return (
                  item.completed === true && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      removeTodo={props.removeTodo}
                      updateTodo={props.updateTodo}
                      completeTodo={props.completeTodo}
                    />
                  )
                );
              }
            )
            : null}
          {props.todos.length > 0 && sort === "all"
            ? props.todos.map((item: { id: React.Key | null | undefined }) => {
              return (
                <TodoItem
                  key={item.id}
                  item={item}
                  removeTodo={props.removeTodo}
                  updateTodo={props.updateTodo}
                  completeTodo={props.completeTodo}
                />
              );
            })
            : null}
        </AnimatePresence>
      </section>
    </div>
  );
};

const Display = connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);

export default Display;
