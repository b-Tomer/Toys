

import { todoService } from "../services/todo.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { addActivity } from "../store/user.action.js"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

export function TodoEdit() {

    const [todoToEdit, settodoToEdit] = useState(null)
    const navigate = useNavigate()
    const params = useParams()


    useEffect(() => {
        if (params.todoId) loadtodo()
    }, [])

    function loadtodo() {
        todoService.getById(params.todoId)
            .then(settodoToEdit)
            .catch(err => {
                console.log('Had issued in todo edit:', err);
                navigate('/todo')
                showErrorMsg('todo not found!')
            })
    }

    function handleChange({ target }) {

        const field = target.name
        console.log('field: ', field);
        const value = target.type === 'number' ? (+target.value || '') : target.value
        settodoToEdit(prevtodo => ({ ...prevtodo, [field]: value }))

    }

    function onSavetodo(ev) {
        ev.preventDefault()
        console.log(todoToEdit);
        todoService.save(todoToEdit)
            .then(() => {
                addActivity({ txt: `Edited a Todo`})
                navigate('/todo')
            })
    }
    if (!todoToEdit) return <div>Loading...</div>
    console.log('todoToEdit: ', todoToEdit);
    return (
        <section className="todo-edit">
            <h2 className="edit-title">Edit todo</h2>

            <form onSubmit={onSavetodo} >
                <div>
                    <label htmlFor="txt">Text: </label>
                    <input className="txts-input" onChange={handleChange} value={todoToEdit.txt} type="text" name="txt" id="txt" />
                </div>

                <div className="btns-section">

                    <button className="btn">Save</button>
                    <Link className="btn" to="/todo">Back to List</Link>
                </div>

            </form>

        </section>
    )

}