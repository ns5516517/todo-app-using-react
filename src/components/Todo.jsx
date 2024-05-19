import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');
    const [editingTodoId, setEditingTodoId] = useState(null); // Track the ID of the todo being edited
    const [showfinished, setshowfinished] = useState(false)
    useEffect(() => {
        let todosString = localStorage.getItem('todos');
        if (todosString) {
            let todos = JSON.parse(localStorage.getItem('todos'));
            setTodos(todos);
        }
    }, [])

    const toglefinished = (e) => {
        setshowfinished(!showfinished)
    }

    const savetoLS = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }


    const handlechange = (e) => {
        setTodo(e.target.value);
    };

    const handleadd = () => {
        if (todo.trim() !== '') {
            setTodos([...todos, { id: uuidv4(), text: todo, completed: false }]);
            setTodo('');
            savetoLS()
        }
    };

    const handleedit = (id) => {
        setEditingTodoId(id); // Set the ID of the todo being edited
        const todoToEdit = todos.find(item => item.id === id);
        if (todoToEdit) {
            setTodo(todoToEdit.text);
        } else {
            console.log('Todo Not Found');
        }
        savetoLS()
    };

    const handleupdate = (id, newText) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, text: newText };
            }
            return todo;
        });
        setTodo('')
        setTodos(updatedTodos);
        setEditingTodoId(null); // Reset the editing state after updating
        savetoLS()
    };

    const handledelete = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
        savetoLS()
    };

    const handlecheckbox = (id, checked) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: checked };
            }
            return todo;
        });
        setTodos(updatedTodos);
        savetoLS()
    };

    return (
        <>
            <div className='bg-slate-300 mx-1 rounded mb-1'>
                <div className='text-black flex justify-between md:mx-64 mx-0 items-center  p-2'>
                    <div className='flex gap-3 items-center'>
                        <h1 className='font-bold text-xl'>Add a TODO</h1>
                        <input onChange={handlechange} value={todo} className='text-black rounded md:w-[380px]  outline-none px-1' type="text" />
                    </div>
                    <button onClick={handleadd} className='hover:bg-slate-800 hover:text-white transition-all border hover:border-slate-700 border-slate-800 py-1 items-center flex justify-center px-4 rounded'>Add</button>
                </div>

                <div className='mx-1  bg-slate-300 min-h-[78vh] p-1 px-2 rounded'>
                    <div className='flex justify-between md:mx-64 mx-0 flex-col'>
                        <div className=' flex items-center gap-4 mx-2 '>
                            <input type="checkbox" onChange={toglefinished} id='show' checked={showfinished} />
                            <label htmlFor="show">Show Finished Todo's</label>
                        </div>
                        <div className='h-[0.6px] w-[90%] mx-auto my-2 bg-black'></div>
                        {todos.length === 0 ? <div className='font-bold text-xl '>You didn't has Create any TODOS</div> : <div className='mb-2 font-bold text-xl'>Your TODOS</div>}
                        {todos.map((item) => (

                            (showfinished || !item.completed) &&
                            <div key={item.id} className='flex justify-between items-center my-2'>
                                <div className='flex w-[73%] overflow-hidden mx-2 gap-4'>
                                    <input name={item.id} type="checkbox" onChange={(e) => handlecheckbox(item.id, e.target.checked)} checked={item.completed} />
                                    {editingTodoId === item.id ? (
                                        <input value={todo} onChange={handlechange} className='text-black rounded-full outline-none px-1' type="text" />
                                    ) : (

                                        <h1 className={item.completed ? 'line-through' : ''} >{item.text}</h1>


                                    )}
                                </div>
                                <div className="btns flex gap-2">
                                    {editingTodoId === item.id ? (
                                        <>
                                            <button onClick={() => handleupdate(item.id, todo)} className='hover:border-slate-300 border-slate-400 hover:bg-slate-400 transition-all border  py-1 items-center flex justify-center px-4 rounded'>Update</button>
                                            <button onClick={() => setEditingTodoId(null)} className='hover:border-slate-300 border-slate-400 hover:bg-slate-400 transition-all border  py-1 items-center flex justify-center px-4 rounded'>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleedit(item.id)} className='hover:border-slate-300 border-slate-400 hover:bg-slate-400 transition-all border  py-1 items-center flex justify-center px-4 rounded'>Edit</button>
                                            <button onClick={() => handledelete(item.id)} className='hover:border-slate-300 border-slate-400 hover:bg-slate-400 transition-all border  py-1 items-center flex justify-center px-4 rounded'>Delete</button>
                                        </>
                                    )
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
export default Todo