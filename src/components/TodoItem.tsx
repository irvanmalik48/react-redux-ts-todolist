import { motion } from "framer-motion";
import { useRef } from "react";
import { Edit, Trash, CheckCircle } from "lucide-react";

const TodoItem = (props: {
  item: any;
  updateTodo: any;
  removeTodo: any;
  completeTodo: any;
}) => {
  const { item, updateTodo, removeTodo, completeTodo } = props;

  const inputRef = useRef<any>();

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const update = (
    id: any,
    value: any,
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      updateTodo({ id, item: value });
      inputRef.current.disabled = true;
    }
  };
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", duration: 0.1 },
      }}
      exit={{ opacity: 0 }}
      key={item.id}
      className="flex flex-col justify-center items-center gap-5 w-full bg-neutral-800 rounded-xl p-5"
    >
      <textarea
        ref={inputRef}
        disabled={inputRef as unknown as boolean}
        defaultValue={item.item}
        onKeyDown={(e) => update(item.id, inputRef.current.value, e)}
        className="bg-transparent outline-none w-full text-neutral-200 resize-none"
      />
      <div className="flex items-center justify-between w-full">
        {item.completed === true ? (
          <p className="text-neutral-200 bg-green-700 px-5 py-2 rounded-full">
            Complete
          </p>
        ) : (
          <p className="text-neutral-200 bg-neutral-700 px-5 py-2 rounded-full">
            Incomplete
          </p>
        )}
        <div className="flex items-center w-fit gap-5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => changeFocus()}
            className="text-neutral-200"
          >
            <Edit size={20} />
          </motion.button>
          {item.completed === false && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => completeTodo(item.id)}
              className="text-neutral-200"
            >
              <CheckCircle size={20} />
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => removeTodo(item.id)}
            className="text-neutral-200"
          >
            <Trash size={20} />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

export default TodoItem;
