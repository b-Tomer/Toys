const { useState, useEffect, useRef } = React
const { useSelector, useDispatch } = ReactRedux


import { utilService } from "../services/util.service.js";
import { SORT_BY } from "../store/todo.reducer.js";
import { ProgressBar } from "./progress-bar.jsx";


export function TodoFilter({ onSearch, onSetFilter, onAddTodo }) {
  const dispatch = useDispatch()
  const filterBy = useSelector((storeState) => storeState.todoModule.filterBy)
  // const sortBy = useSelector((storeState) => storeState.todoModule.sortBy)
  


const onSetFilterDebounce = useRef(utilService.debounce(onSetFilter))

useEffect(() => {
  onSetFilterDebounce.current(filterBy)
}, [])

  
  function onHandleSearch(ev) {
    const val = ev.target.value
    console.log(val);
    onSearch(val)
  }

  function onAll({ target }) {
    let isAll = target.checked
    if (isAll) onSetFilterDebounce({ all: true })
    else onSetFilterDebounce({ all: false })
  }

  function onActive({ target }) {
    let isActive = target.checked
    if (isActive) onSetFilterDebounce({ Active: true })
    else onSetFilterDebounce({ Active: false })
  }

  function onDone({ target }) {
    let isDone = target.checked
    if (isDone) onSetFilterDebounce({ done: true })
    else onSetFilterDebounce({ done: false })
  }

  function onSortBy(ev){
    const value= ev.target.value
    console.log(value)
    dispatch({type: SORT_BY, sortBy: value})
  }

  return (
    <section className="todo-filter fully">
      <p>Filters:</p>

      <select onChange={onSortBy} className="txt-input" name="sort" id="sort">
        <option value="title">Name</option>
        <option value="createdAt">Created At</option>
      </select>
      <div className="lables">
        <div>
          <input type="checkbox" onChange={onAll} id="all" />
          <label htmlFor="all">All</label>
        </div><div>
          <input type="checkbox" onChange={onActive} id="need-CR" />
          <label htmlFor="need-CR">Active</label>
        </div><div>
          <input type="checkbox" onChange={onDone} id="dev-branch" />
          <label htmlFor="dev-branch">Done</label>
        </div>
      </div>
      <input type="search" className="txt-input" placeholder="search" onChange={onHandleSearch} />
      <ProgressBar />
      <button className="btn" onClick={onAddTodo}>Add Todo</button>
    </section>
  );
}
