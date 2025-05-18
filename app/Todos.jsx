"use client";

import { useState, useEffect } from "react";

export default function TodoForm() {
    const [todo, setTodo] = useState({ done: false, text: "" });
    const [todos, setTodos] = useState([]);

    const handleTodoChange = (e) => {
        setTodo({ done: todo.done, text: e.target.value });
    };
    const submitForm = async(e) => {
        e.preventDefault();
        if (todo.text.trim()) {
            setTodos([...todos, { done: todo.done, text: todo.text }]);
            localStorage.setItem("todos", JSON.stringify([...todos, todo]));
            setTodo({ done: todo.done, text: ""});
        }
    }

    useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, [])

    const deleteTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }

    return (
        <>
            <div className="mb-10">
                {todos.map((todo, index) => (
                    <div key={index} className="grid mx-auto w-fit bg-gray-200 rounded-lg mb-2 text-center">
                        <p className="w-30 font-bold">{todo.text}</p> <br />
                        <input type="checkbox" checked={todo.done} className="mb-4" onChange={(e) => {                 
                            const updatedTodos = [...todos];
                            updatedTodos[index] = { done: e.target.checked, text: updatedTodos[index].text };
                            setTodos(updatedTodos);
                            localStorage.setItem("todos", JSON.stringify(updatedTodos));
                        }}/>
                        <button onClick={() => deleteTodo(index)} className="mx-auto bg-red-600 w-7 h-7 rounded-2xl hover:bg-red-700 active:bg-red-800 duration-300">🗑️</button>
                    </div>
                ))}
            </div>

            <form className="grid place-items-center" onSubmit={(e) => submitForm(e)}>
                <br />
                <input className="mx-auto w-fit bg-gray-200 rounded-lg mb-5" type="text" value={todo.text} onChange={(e) => handleTodoChange(e)}/>
                <button className="mx-auto w-fit bg-gray-200 rounded-lg hover:bg-gray-300 active:bg-gray-400 duration-300">SUBMIT</button>
            </form>
        </>
    )
}