import { ChangeEvent, useState } from "react";
import { connect } from "react-redux";
import { addTodos } from "../redux/reducer";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

const mapStateToProps = (state: any) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (
  dispatch: (arg0: { payload: any; type: "todos/addTodos" }) => any
) => {
  return {
    addTodo: (obj: any) => dispatch(addTodos(obj)),
  };
};

const TodosList = (props: {
  addTodo: (arg0: { id: number; item: string; completed: boolean }) => void;
}) => {
  const [todo, setTodo] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const add = () => {
    if (todo === "") {
      alert("Input is Empty");
    } else {
      props.addTodo({
        id: Math.floor(Math.random() * 1000),
        item: todo,
        completed: false,
      });
      setTodo("");
    }
  };

  return (
    <div className="flex gap-5 justify-center items-center w-full">
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        className="w-full rounded-full px-5 py-2 bg-neutral-900 outline-none border-2 border-neutral-700 transition focus:border-red-500 ring-2 ring-transparent focus:ring-red-500 focus:ring-opacity-50"
        value={todo}
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        className="w-fit p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full flex justify-center items-center transition"
        onClick={() => add()}
      >
        <PlusCircle size={24} />
        <p className="pr-5 pl-4">Add</p>
      </motion.button>
      <br />
    </div>
  );
};

const Todos = connect(mapStateToProps, mapDispatchToProps)(TodosList);

export default Todos;
