import TodoForm from "./Todos";

export default function Home() {
  return (
    <div>
      <h1 className="mx-auto w-fit text-3xl font-bold m-5">TODO App</h1>

      <TodoForm/>
    </div>
  );
}
