import "./App.css";
import DisplayTodos from "./components/DisplayTodos";
import Todos from "./components/Todos";

function App() {
  return (
    <>
      <article className="w-full mt-12 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-start w-full">SaveTodo</h1>
        <p className="mt-2 text-neutral-400 text-start w-full">
          A simple todo app made with React, TypeScript, TailwindCSS, and Redux.
        </p>
        <div className="w-full mt-5 gap-5 flex flex-col justify-center items-center">
          <Todos />
          <DisplayTodos />
        </div>
      </article>
    </>
  );
}

export default App;
