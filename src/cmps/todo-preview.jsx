const { useSelector, useDispatch } = ReactRedux
const { useState } = React
import { UPDATE_TODO } from '../store/todo.reducer.js'
import { saveTodo } from '../store/todo.action.js'


export function TodoPreview({ todo, progressPrecent }) {
    const dispatch = useDispatch()
    const todos = useSelector((storeState) => storeState.todos)


    function handleChange(ev) {
        const val = ev.target.checked
        todo.isDone = !todo.isDone
        dispatch({ type: UPDATE_TODO, todo })
        console.log('from change:::: ' , todos);
        saveTodo(todo).then(()=>{

            progressPrecent()
        })
    }

    return <div className="todo-txt">
        <input id={todo.id} type="checkbox" onChange={handleChange} />
        <label className="todo-lable-txt" htmlFor={todo.id}>
            <h4 className={ todo.isDone  ? 'completed-task' : ''}>{todo.txt}</h4>
            <h5 className="created-at">At: {todo.createdAt}</h5>
        </label>


    </div>
}