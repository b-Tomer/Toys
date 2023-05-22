const { Link } = ReactRouterDOM

import { TodoPreview } from "./todo-preview.jsx"

export function TodoList({ todos, onRemoveTodo ,progressPrecent}) {
    if(!todos) return ''
    return <ul className="todo-list">
        {todos.map(todo =>
            <li className="todo-preview" key={todo._id}>
                <TodoPreview todo={todo} progressPrecent={progressPrecent} />
                <div className="options">
                    <Link className="btn" to={`/todo/details/${todo._id}`}><i className="fa-solid fa-info"></i></Link>
                    <Link className="btn" to={`/todo/edit/${todo._id}`}><i className="fa-solid fa-pen-to-square"></i></Link>
                    <button className="btn" onClick={() => { onRemoveTodo(todo._id) }}><i className="fa-solid fa-trash-can"></i></button>
                </div>
            </li>)}
    </ul>
}