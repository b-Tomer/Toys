const { useState, useEffect } = React
const { Link, useParams } = ReactRouterDOM

import { todoService } from '../services/todo.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'


export function TodoDetails() {

    const [todo, setTodo] = useState(null)
    const { todoId } = useParams()
    // const todos = useSelector((storeState) => storeState.todos)

    useEffect(() => {
        todoService.getById(todoId)
            .then(todo => {
                setTodo(todo)
            })
            .catch(err => {
                showErrorMsg('Cannot load todo')
            })
    }, [])

    console.log(todo);

    if (!todo) return <h1>loadings....</h1>
    return todo && <div>
        <h3>Todo Details:</h3>
        <h5>ID: {todo._id}</h5>
        <h4>Content:{todo.txt}</h4>
        <h4>Created At: {todo.createdAt}</h4>
        <h4>Creator: {todo.creator.userName}</h4>
        <h4>State: { todo.isDone  ? 'Completed task' : 'Waiting...'}</h4>

        <Link className="btn" to="/todo">Back to List</Link>
    </div>

}

